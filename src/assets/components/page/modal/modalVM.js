define([
    'Vue',
    'text!components/page/modal/modal.mustache',
    'common/mixins/pageMixins',
    'common/helper/localStorage',
    'common/filter/format'
], function(Vue, tpl, pageMixins, localStorage) {
    var Modal = Vue.extend({
        name: 'modal',
        components: {},
        template: tpl,
        mixins: [pageMixins],
        data: function() {
            var localStorages = localStorage.getAll();

            if (localStorages && localStorages.length){
                this.$dispatch('notifyRootShowList');  
                return {
                    localStorages: localStorages,
                    showModal: false
                };
            } else
                return {
                    localStorages: localStorages,
                    showModal: false
                };
        },
        methods: {
            hideModal: function() {
                this.showModal = false;
                this.$dispatch('notifyRootShowList');
            },
            continueEdit: function($event) {
                var $target = $($event.target),
                    id = $target.closest('tr').data('id');
                var item = localStorage.get(id);
                this.$dispatch('notifyRootContinueEdit', {
                    id: id,
                    item: item
                });
                this.$dispatch('notifyRootShowList');
                this.showModal = false;
            }
        },
        events: {
            notifyModalShowModal: function() {
                this.showModal = true;
            }
        }
    });
    return Modal;
});