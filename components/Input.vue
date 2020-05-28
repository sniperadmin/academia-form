<template>
  <v-container
    class="ma-0 pa-0"
    fluid
  >
    <v-row
      no-gutters
      align="start"
      justify="start"
    >
      <v-col :cols="cols">
        <v-label
          :for="labelFor"
          class="sb-input-label text-truncate black--text"
        >
          {{ label }}
          <span v-if="rules.length > 0" class="red--text">*</span>
        </v-label>
        <v-text-field
          v-if="!textArea"
          :hide-details="hideDetails"
          :hint="hint"
          :persistent-hint="persistentHint"
          :value="value"
          :rules="rules"
          :type="type"
          :placeholder="placeholder"
          :error-messages="errorMessages"
          :disabled="disabled"
          :clearable="clearable"
          class="sb-input-field mt-1 mb-3"
          color="black"
          single-line
          outlined
          background-color="#fafafa"
          clear-icon="mdi-close-circle-outline"
          @input="$emit('input', $event)"
          @keyup="$emit('keyup', $event)"
          @keyup.enter="$emit('enter')"
        />
        <v-textarea
          v-if="textArea"
          :dense="dense"
          :filled="filled"
          :disabled="disabled"
          :rules="rules"
          :value="value"
          class="sb-input-field"
          color="black"
          background-color="#fafafa"
          outlined
          single-line
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Input',
  props: {
    label: {
      type: String,
      default: null
    },
    // enabel text-area
    textArea: {
      type: Boolean,
      default: false
    },
    // text area attrs
    dense: {
      type: Boolean,
      default: false
    },
    filled: {
      type: Boolean,
      default: false
    },
    // all common attrs
    value: {
      type: [String || Number],
      default: null
    },
    hint: {
      type: String,
      default: null
    },
    persistentHint: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array,
      default: null
    },
    cols: {
      type: Number,
      default: 12
    },
    labelFor: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    hideDetails: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    errorMessages: {
      type: Array,
      default: null
    },
    clearable: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
.v-input__control {
  min-height: 20px !important;
}
.v-input__control .v-input__append-inner{
  margin-top: 4px !important;
}
label .v-label .theme--light {
  font-weight: 500;
}
.v-text-field .v-input__slot {
  min-height: 20px !important;

}
.v-textarea.v-text-field--enclosed .v-text-field__slot textarea[name='disabledDescription'] {
  color: rgba(0, 0, 0, 0.38);
}
.v-textarea textarea {
  padding-top: 0 !important;
}
.v-label {
  font-size: 16px  ;
  /* color: black !important; */
  font-weight: 500;
  min-width: 60px !important;
}
.sb-input-field {
  font-size: 16px;
  max-width: 300px;

}
.sb-input-max-width {
  font-size: 16px;
  max-width: 140px;
}
</style>
