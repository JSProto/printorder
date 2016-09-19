/**
 * Created by azbenek on 05.12.2015.
 */
let Vue = require('vue');
let Dexie = require('dexie');

let accounting = require('accounting');

accounting.settings.currency.format = "%v %s";

var log, App, tableItems;

let db = new Dexie('OrdersDatabase');

db.version(1).stores({
    categories: "&id, group, description",
    items: "++id, &code, cat_id, description, price",
    orders: "++id, datetime",
    order_items: "++id, order_id, code, qty, description, total"
});
db.open();


let Application = Vue.extend({

    created: function(){
        this.importDbToApp();
    },
    methods: {
        importJsonToDb: function() {
            var data = require("./example.db.json");

            Object.keys(data).forEach((key)=>{
                console.log(key);
                db[key].clear();

                db[key].bulkAdd(data[key])
                    .then(() => log.info('Loaded %s.', key))
                    .catch(Dexie.BulkError, e => log.error("Error: ", key, (e.stack || e)));
            });
        },

        importDbToApp: function(){
            db.categories.orderBy('id').toArray(data => this.categories.data = data);
            db.items.orderBy('description').toArray(data => this.items.data = data);
            db.orders.orderBy('id').toArray(data => this.orders.data = data);
            db.order_items.orderBy('description').toArray(data => this.orderItems.data = data);
        },

        getCategoryName: function(id){
            var category = this.categories.data.find((c) => c.id == id );
            if (category) {
                return category.description;
            }
            else {
                return "";
            }
        }
    }
});


jQuery(function($) {
    // init Vue
    log = new Vue({
        el: '#alert',
        data: {
            style: 'info',
            message: '',
            visible: 'hide'
        },
        methods: {
            show: function(style, message, autohide) {
                this.style = style;
                this.message = message;
                this.visible = '';
                if (autohide) {
                    setTimeout(() => {
                        this.hide();
                    }, 5000);
                }
            },
            hide: function() {
                this.visible = 'hide'
            },
            info: function(message) {
                this.show('info', message, true);
            },
            error: function(message) {
                this.show('danger', message, true);
            },
            success: function(message) {
                this.show('success', message, true);
            },
            warning: function(message) {
                this.show('warning', message, true);
            },
            warn: function(message) {
                this.show('warning', message, true);
            }
        }
    });

});
