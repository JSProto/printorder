/**
 * Created by azbenek on 06.12.2015.
 */

Vue.filter('getCategoryName', function (value) {
    return global.App.getCategoryName(value);
});

// tableItems = new Vue({
//     methods: {

//         save: function(){
//             var data = Object.assign({}, this.$data);

//             db.items.update(this.id, data)
//                 .then(updated => {
//                     if(updated){
//                         log.success('Зміни збережено вдало');
//                         tableItems.updateItem(index, data);
//                         // jQuery('tr#' + this.code).effect("highlight", {}, 3000);
//                     }

//                     this.hide();
//                 })
//                 .catch( function(error){
//                     log.error('Помилка збереження змін.');
//                     console.log('error: ', error);
//                     this.hide();
//                 });
//         }
//     }
// });

global.App = new Application({
    el: '#content',
    replace: false,
    data: {
        categories: {
            columns: [{
                key: 'id',
                name: 'ID',
                allowEdit: false,
                style: {
                    width: '5%'
                }
            }, {
                key: 'description',
                name: 'Название'
            }, {
                key: 'group',
                name: 'Группа',
                style: {
                    width: '65px'
                }
            }],
            data: []
        },
        items: {
            columns: [{
                key: 'id',
                name: 'ID',
                allowEdit: false,
                style: {
                    width: '5%',
                    'text-align': 'center'
                }
            }, {
                key: 'code',
                name: 'Код',
                style: {
                    width: '52px'
                }
            }, {
                key: 'cat_id',
                name: 'Категория',
                filter: {
                    name: 'getCategoryName'
                }
            }, {
                key: 'description',
                name: 'Название'
            }, {
                key: 'price',
                name: 'Price',
                filter: {
                    name: 'currency'
                },
                style: {
                    width: '85px',
                    'text-align': 'right'
                }
            }],
            data: []
        },
        orders: {
            columns: [{
                key: 'id',
                name: 'ID',
                allowEdit: false,
                style: {
                    width: '5%'
                }
            }, {
                key: 'datetime',
                name: 'Дата создания'
            }],
            data: []
        },
        orderItems: {
            data: []
        }
    }
});

