<template>
  <div class="d-flex justify-content-center">
    <msm-validation-errors v-if="errors" :validation-errors="errors" ></msm-validation-errors>
    <form class="w-25" @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="exampleInputEmail1">Name</label>
        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
               placeholder="Enter your full name" v-model="title">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Description</label>
        <input v-model="description" type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter your country of birth">
      </div>
      <div class="form-group">
        <label for="exampleFormControlFile1">Cover Image</label>
        <input type="file" class="form-control-file" id="exampleFormControlFile1" @change="handleFileUpload">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Year of publication</label>
        <input v-model="year_of_publication" type="number" class="form-control" id="exampleInputPassword1" placeholder="Enter comment">
      </div>
      <div class="form-group">
        <label for="authorSelect">Author</label>
        <select id="authorSelect" class="form-control" v-model="author_id">
          <option v-for="author in authors" :key="author.id" :value="author.id">{{ author.full_name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="authorSelect">Section</label>
        <select id="authorSelect" class="form-control" v-model="section_id">
          <option v-for="section in sections" :key="section.id" :value="section.id">{{ section.name }}</option>
        </select>
      </div>
<!--      <div class="form-group">-->
<!--        <label for="exampleInputPassword1">Section</label>-->
<!--        <input v-model="section_id" type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter comment">-->
<!--      </div>-->
      <div class="form-check">
      </div>
      <button type="submit" :disabled="isSubmitting" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import MsmValidationErrors from '@/components/ValidationErrors'
import {mapState} from "vuex";
import {actionTypes} from "@/store/modules/author";
import {actionTypes as actionTypesSection} from "@/store/modules/section";

export default {
  name: 'MsmBookForm',
  props: {
    initialValues: {
      type: Object,
      required: true
    },
    errors: {
      type: Object,
      required: false
    },
    isSubmitting: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapState({
      authors: state => state.author.data,
      sections: state => state.section.data,
    })
  },
  mounted() {
     this.$store.dispatch(actionTypes.getAuthors);
     this.$store.dispatch(actionTypesSection.getSections);
    console.log(this.initialValues)
  },
  components: {
    MsmValidationErrors
  },
  data() {
    return {
      title: this.initialValues.title,
      description: this.initialValues.description,
      cover_image: this.initialValues.cover_image,
      year_of_publication: this.initialValues.year_of_publication,
      author_id: this.initialValues.author_id,
      section_id: this.initialValues.section_id,
    }
  },
  methods: {
    onSubmit() {
      const form = {
        title: this.title,
        description: this.description,
        cover_image: this.cover_image,
        year_of_publication: this.year_of_publication,
        author_id: this.author_id,
        section_id: this.section_id,
      }
      console.log(form)
      this.$emit('bookSubmit', form)
    },
    handleFileUpload(event) {
      this.cover_image = event.target.files[0]
    },
  }
}
</script>
