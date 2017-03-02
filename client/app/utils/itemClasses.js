/*
 *  Classes for the Item detail view
 */

 import Ember from 'ember';
 import config from 'ember-get-config';
 import loadAll from 'ember-osf/utils/load-relationship';

/*
 *  Construct the individual data pieces shown to user and their states
 */
 const ViewData = Ember.Object.extend({
     value: null,
     loaded: false,
     visible: true,
     setValue(newValue){
         if(Ember.isNone(newValue)){
             return;
         }
         this.set('value', newValue);
         this.set('loaded', true);
     },
     show(){
         this.set('visible', true);
     },
     hide(){
         this.set('visible', false);
     },
     reset(){
         this.set('value', null);
         this.set('loaded', false);
     }
 });

 /*
  *  Base item variavles and helpers, sets content common to all or most
  */
 const Item = Ember.Object.extend({
     viewContent : Ember.Object.create({
         title: ViewData.create(),
         description: ViewData.create(),
         tags: ViewData.create(),
         authors: ViewData.create(),
         wiki: ViewData.create({visible:false}),
         file: ViewData.create({visible:false})
     }),
     setAuthors() {
         const contributors = Ember.A();
         const node = this.get('node');
         let self = this;
         loadAll(node, 'contributors', contributors).then(function (){
             self.get('viewContent.authors').setValue(contributors);
         });
     },
     setCommonNodeContent(node){
         this.set('node', node);
         this.get('viewContent.description').setValue(node.get('description'));
         this.get('viewContent.tags').setValue(node.get('tags'));
         this.setAuthors();
     },
     init (){
         this.get('viewContent.title').setValue(this.get('item.title'));
     }
 });

 /*
  *  Builds data points for website type item
  */
 const Website = Item.extend({
     init(){
         this._super();
         this.set('description', this.get('item.metadata'));
         this.get('viewContent.tags').hide();
     }
 });

 /*
  *  Builds data points for project ('node') type item
  */
 const Project = Item.extend({
     setWiki (){
         let self = this;
         let node = this.get('node');
         let wikis = node.get('wikis');
         self.get('viewContent.wiki').show();
         if(wikis){
             wikis.then(function(result){
                 if(result.objectAt(0)){
                     let url = result.objectAt(0).get('links.download');
                     let headers = {};
                     let authType = config['ember-simple-auth'].authorizer;
                     self.get('session').authorize(authType, (headerName, content) => {
                         headers[headerName] = content;
                     });

                     Ember.$.ajax({
                         method: 'GET',
                         headers,
                         url
                     }).done(data => {
                         self.get('viewContent.wiki').setValue(data);
                     });
                 } else {
                     self.get('viewContent.wiki').setValue('This project does not have wikis.');
                 }
             }.bind(this));
         } else {
             self.get('viewContent.wiki').setValue('Could not find wiki for this project.');
         }
     },
     init(){
         this._super();
         let self = this;
         this.get('store').findRecord('node', this.get('item.source_id')).then(function(node){
             self.setCommonNodeContent(node);
             self.setWiki();
         });
     }
 });

 /*
  *  Builds data points for preprint type item
  */
 const Preprint = Item.extend({
     setPreprint(){
         let node = this.get('node');
         this.get('viewContent.file').show();
         node.get('preprints').then(result => {
             if(result.objectAt(0)){
                 result.objectAt(0).get('primaryFile').then(pf => {
                     this.get('viewContent.file').setValue(pf.get('links').download);
                 });
             }
         });
     },
     init(){
         this._super();
         let self = this;
         this.get('store').findRecord('node', this.get('item.source_id')).then(function(node){
             self.setCommonNodeContent(node);
             self.setPreprint();
         });

     }
 });

 /*
  *  Builds data points for registration type item
  */
 const Registration = Item.extend({
     init(){
         this._super();
         let self = this;
         this.get('store').findRecord('registration', this.get('item.source_id')).then(function(node){
             self.setCommonNodeContent(node);
         });
     }
 });


 const itemClasses = {
     viewData: ViewData,
     item: Item,
     website: Website,
     project: Project,
     preprint: Preprint,
     registration: Registration
 };

export {itemClasses};
