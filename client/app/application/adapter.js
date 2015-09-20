import DS from 'ember-data';


export default DS.RESTAdapter.extend({
  host: 'http://radiomadlibs-db.herokuapp.com'
});
