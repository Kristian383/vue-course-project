<template>
  <div>
    <base-dialog :show="!!error" title="Error occured!" @close="handleError">
    <p>{{ error }}></p>
  </base-dialog>
  <section>
    <coach-filter @change-filter="setFilters"></coach-filter>
  </section>

  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>

        <base-button v-if="!isCoach && !isLoading" link to="/register"
          >Register as coach</base-button
        >
      </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="hasCoaches">
        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :firstName="coach.firstName"
          :lastName="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
          :id="coach.id"
        >
          {{ coach.firstName }}
        </coach-item>
      </ul>
      <h3 v-else>No coaches found</h3>
    </base-card>
  </section>
  </div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter';
export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches(refresh=false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches',{forceRefresh:refresh});
      } catch (error) {
        this.error = error.message || 'Something went wrong';
      }
      this.isLoading = false;
    },
    handleError(){
      this.error=null;
    }
  },
  data() {
    return {
      activeFilters: {
        frontend: true,
        backend: false,
        career: false,
      },
      isLoading: false,
      error: null,
    };
  },
  created() {
    this.loadCoaches();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>