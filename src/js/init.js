/**
 * Created by azbenek on 05.12.2015.
 */

let App;

global.jQuery = require('jquery');

require('jquery-ui');
require('bootstrap');

const Vue = require('vue');
const Dexie = require('dexie');

const currency = require('accounting');
const notify = require('notification-js');

const db = new Dexie('OrdersDatabase');

"default,info,error,success,warning".split(",").map(method => {
    notify[method] = function(message, options){
        return notify.notify(method, message, options);
    };
});

notify.configProfile('global', {
    notification: {
        position: ['right', 'bottom']
    }
});

currency.settings = {
    currency: {
        symbol: String.fromCharCode(8372),   // default currency symbol is '₴'
        precision: 2,
        format: "%v %s",
        decimal: ".",
        thousand: " "
    },
    number: {
        precision: 0,  // default precision on numbers is 0
        thousand: " ",
        decimal : "."
    }
};


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
            var data = require("../db.json");

            Object.keys(data).forEach((key)=>{
                db[key].clear();

                db[key].bulkAdd(data[key])
                    .then(() => console.info(`Loaded ${key}.`))
                    .catch(Dexie.BulkError, e => notify.error("Error: ", key, (e.stack || e)));
            });

            notify.info("База данных обновлена");
        },

        importDbToApp: function(){
            db.categories.orderBy('id').toArray(data => this.categories.data = data);
            db.items.orderBy('description').toArray(data => this.items.data = data);
            db.orders.orderBy('id').toArray(data => this.orders.data = data);
            db.order_items.orderBy('description').toArray(data => this.orderItems.data = data);

            notify.info("Данные загружены в приложение");
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