/**
 * GnbModel
 */
var GnbModelClass = defineClass({

	extend : BaseModelClass,
	name : 'GnbModelClass',

	construct : function(){
		this.superclass();
		this._init([
            'photo_list',
            'pado_list'
        ]);
	},

    methods : {
        getIds : function() {
            return [
                {   "id" : "photo_list",
                    "url" : "photo_list.html",
                    "focus" : "myphoto1",
                    "blur" : "myphoto2" },

                {   "id" : "pado_list",
                    "url" : "pado_list.html",
                    "focus" : "pado1",
                    "blur" : "pado0" },

                {   "id" : "people_list",
                    "url" : "people_list.html",
                    "focus" : "pado1",
                    "blur" : "pado0" },

                {   "id" : "blog_photo_list",
                    "url" : "blog_photo_list.html",
                    "focus" : "photo1",
                    "blur" : "photo0" },

                {   "id" : "setup",
                    "url" : "setup.html",
                    "focus" : "setup1",
                    "blur" : "setup0" },
            ]
        }
    }
});
