<template>
  <woot-modal :show.sync="show" :on-close="onCancel">
    <div class="column content-box">
      <woot-modal-header
        :header-title="
          `${$t('EDIT_CONTACT.TITLE')} - ${contact.name || contact.email}`
        "
        :header-content="$t('EDIT_CONTACT.DESC')"
      />
      <contact-form
        :contact="contact"
        :in-progress="uiFlags.isUpdating"
        :on-submit="onSubmit"
      />
    </div>
  </woot-modal>
</template>

<script>
import { mapGetters } from 'vuex';
import ContactForm from './ContactForm';

export default {
  components: {
    ContactForm,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    contact: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    ...mapGetters({
      uiFlags: 'contacts/getUIFlags',
    }),
  },

  methods: {
    onCancel() {
      this.$emit('cancel');
    },
    async onSubmit(contactItem) {
      await this.$store.dispatch('contacts/update', contactItem);
    },
  },
};
</script>
