<template>
	<div>

		<nav class="navbar is-light" role="navigation" aria-label="main navigation">
			
			<div class="navbar-brand has-text-centered-touch">
			    
			    <a class="navbar-item container is-hidden-desktop" href="/">
			      	<b class="title" >Padrón de femicidios</b>		      	
			    </a>
			    <a class="navbar-item is-hidden-touch" href="/">
			      	<b class="title" >Padrón de femicidios</b>		      	
			    </a>

			    <button class="button navbar-burger is-hidden">
			      <span></span>
			      <span></span>
			      <span></span>
			    </button>
			  	
			</div>				
			
			<div class="navbar-brand has-text-centered-touch">
		  		<div class="navbar-item container">

		  			<div class="field is-grouped" >
					    <p class="control">
			            	<a class="button is-primary" href="#" @click="showModal = true" >
			              		<span class="icon" >
			              			<fa-icon iconName="folder-open" ></fa-icon>
			              		</span>
		              			<span>Ver hoja de cálculos completa</span>
			            	</a>
			          	</p>
			          	<p class="control">
			            	<a target="_blank" class="button is-info" :href="sheet_url"  >
			              		<span class="icon" >
			              			<fa-icon iconName="external-link-alt" ></fa-icon>
			              		</span>
		              			<span>Abrir en drive</span>
			            	</a>
			          	</p>
		          	</div>
	          	</div>
         	</div> 	
		    

		</nav>
	

		<section class="section" >		

			<div class="container">

				<div class="columns is-multiline">

					<chart title="Por edad" 
			    		   :chart-type="'bar'" 
			    		   :data="getData('B')" 		
			    		   :fetching-data="fetchingData"
			    		   :show-legend="false" 
			    		   :show-percents="false"
			    		   :data-tresh-hold="20"				    		   
			    		   >	      		


			      	</chart>

			      	<chart title="Por lugar" 
			    		   :chart-type="'bar'" 
			    		   :data="getData('F')" 		
			    		   :fetching-data="fetchingData"
			    		   :show-legend="false" 
			    		   :show-percents="false"
			    		   :data-tresh-hold="10"				    		   
			    		   >
			      	</chart>

			      	<chart title="Cómo" 
			    		   :chart-type="'pie'" 
			    		   :data="getData('H')" 		
			    		   :fetching-data="fetchingData"
			    		   :show-legend="true" 
			    		   :show-percents="true"
			    		   :total-rows="totalRows"
			    		   :data-tresh-hold="10"				    		   
			    		   >
			      	</chart>

			      	<chart title="Quién" 
			    		   :chart-type="'pie'" 
			    		   :data="getData('I')" 		
			    		   :fetching-data="fetchingData"
			    		   :show-legend="true" 
			    		   :show-percents="true"
			    		   :total-rows="totalRows"
			    		   :data-tresh-hold="10"				    		   
			    		   >	      		

			      	</chart>
				  			  
				</div>

				<div class="modal" :class="showModal ? 'is-active' : ''" >

				  <div class="modal-background"></div>
				  <div class="modal-card">
				    <header class="modal-card-head">
				      <p class="modal-card-title">
				      	Padrón de femicidios<br/>
				      	<span class="has-text-primary" >Nuestra base de datos (1974-2017)</span>
				      </p>
				      <button @click="showModal = false" class="modal-close is-large" aria-label="close"></button>
				    </header>
				    <section class="modal-card-body">
				      <iframe style="width:100%; height:500px;" :src="sheet_url"></iframe>
				    </section>				    
				  </div>

				</div>

		    </div>
		</section>
	</div>

	 
</template>

<script>

	import Vuex from 'vuex';
	import Chart from './Chart.vue'
	import FaIcon from './FaIcon.vue'
	
    export default {
    	name: 'App',    	
    	data: () => {
    		return {
    			showModal: false,
				current_route: window.location.pathname,	    
				sheet_url: null
    		}
		},
		components: {
			Chart,
			FaIcon
		},
		computed: Object.assign(

            Vuex.mapState({                     
                fetchingData: state => state.fetchingData
            }),
            Vuex.mapGetters([
				'parsedData', 'totalRows'
			])

        ),
		mounted: function() {	    	

		    this.$store.dispatch('SET_COLUMNS', this.$config.COLUMNS);
		    this.$store.dispatch('LOAD_DATA', this.$config.JSON_SHEET_URL);
		    this.sheet_url = this.$config.SHEET_URL;

		},    	    
		methods:{
			getData: function( column ){
				return _.find(this.parsedData, function(d) { return d.column == column; });				
			}   
		}
	}

</script>

<style lang="scss">
   @import '../assets/scss/app.scss';
</style>