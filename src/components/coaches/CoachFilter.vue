<template>
  <base-card>
    <h2>Find your Coach</h2>
    <span class="filter-option">
        <input type="checkbox" id="frontend" checked  @change="setFilter">
        <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option">
        <input type="checkbox" id="backend"  @change="setFilter">
        <label for="backend">Backend</label>
    </span>
    <span class="filter-option">
        <input type="checkbox" id="career"  @change="setFilter">
        <label for="career">career</label>
    </span>
  </base-card>
</template>

<script>
export default {
    emits:["change-filter"],
    data(){
        return{
            filters:{
                frontend:true,
                backend:false,
                career:false
            }
        }
    },
    methods:{
        setFilter(e){
            const id=e.target.id;
            const isActive=e.target.checked;

            const updatedFilters={
                ...this.filters,
                [id]:isActive,
                
            }
            this.filters=updatedFilters;
            this.$emit("change-filter",updatedFilters)
        }
    }
}
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>