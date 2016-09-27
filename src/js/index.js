/**
 * Created by azbenek on 06.12.2015.
 */

Vue.filter("getCategoryName", function(value) {
    return App.getCategoryName(value);
});

// filters
Vue.filter('localeDate', function(dt) {
    return dt ? dt.toLocaleString() : '';
});

App = new Application({
    el: '#content',
    replace: false,
    data: {
        categories: {
            columns: [{
                key: "id",
                name: "ID",
                allowEdit: false,
                style: {
                    width: '5%'
                }
            }, {
                key: "name",
                name: "Название"
            }, {
                key: "group",
                name: "Группа",
                style: {
                    width: '65px'
                }
            }],
            data: []
        },
        items: {
            columns: [{
                key: "id",
                name: "ID",
                allowEdit: false,
                style: {
                    width: '5%'
                }
            }, {
                key: "code",
                name: "Код",
                style: {
                    width: '52px'
                }
            }, {
                key: "cat_id",
                name: "Категория",
                filter: {
                    name: "getCategoryName"
                }
            }, {
                key: "name",
                name: "Название"
            }, {
                key: "price",
                name: "Price",
                filter: {
                    name: "currencyDisplay"
                },
                style: {
                    width: '85px',
                    'text-align': 'right'
                }
            }],
            data: []
        },
        orders: {
            columns: [],
            data: []
        },
        orderItems: {
            columns: [],
            data: []
        },
        query: "",
        selected_category: null,

        cart: {
            id: 0,
            datetime: new Date,
            total: 0,
            items: []
        }
    },
    computed: {
        cart: function(){
            this.$data.cart.id = this.nextOrderId();
            return this.$data.cart;
        }
    },
    methods: {
        nextOrderId: function(){
            return this.orders.data
                .map(o => o.id).reduce((m, id) => m > id ? m : id, 0) + 1;
        },
        getListItem: function(){
            var ids = this.cart.items.map(e => e.id);
            return this.items.data.filter((row) => !~ids.indexOf(row.id));
        },
        getCountItems: function(id){
            return this.items.data.filter((item) => {
                return item.cat_id == id;
            }).length;
        },
        getCategoryName: function(id){
            var category = this.categories.data.find((c) => c.id == id );
            if (category) {
                return category.name;
            }
            else {
                return "";
            }
        },
        addToCart: function(row) {
            this.cart.items.push(Object.assign({qty: 1}, row));
            notify.info("В корзину добавлен один элемент");
        },
        printOrder: function(orderItems){
            console.log("print order", Vue.filter("json").read(orderItems));
        },
        openAdminPanel: function(){
            const {ipcRenderer} = require('electron');
            ipcRenderer.send('open-admin-page', 'ping');
        }
    }
});
