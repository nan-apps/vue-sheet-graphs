<template>
	<div>

		<nav class="navbar is-light" role="navigation" aria-label="main navigation">
			
			<div class="navbar-brand has-text-centered-touch">
			    
			    <a class="navbar-item container is-hidden-desktop" href="/">
			      	<b class="title" >Vue sheet graphs</b>		      	
			    </a>
			    <a class="navbar-item is-hidden-touch" href="/">
			      	<b class="title" >Vue sheet graphs</b>		      	
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

					<chart title="Colores" 
			    		   :chart-type="'doughnut'" 
			    		   :data="getData('A')"
			    		   :show-legend="true" 
			    		   :show-percents="true"
			    		   :total-rows="totalRows"			    		   
			    		   :data-tresh-hold="false"		
			    		   :fetching-data="fetchingData"				    		   
			    		   >	      		
			      	</chart>
					    
			    	<chart title="Paises" 
			    		   :chart-type="'bar'" 
			    		   :data="getData('B')"
			    		   :show-legend="false" 
			    		   :show-percents="false"
			    		   :data-tresh-hold="false" 				    		   			    		   
			    		   :fetching-data="fetchingData">	      		
			      	</chart>
				    
			    	<chart title="Vegetales" 
			    		   :chart-type="'bar'" 
			    		   :data="getData('C')"
			    		   :show-legend="false" 
			    		   :show-percents="false"
			    		   :data-tresh-hold="false" 			    		   			    		   
			    		   :fetching-data="fetchingData">	      		
			      	</chart>
				    
			    	<chart title="Frutas" 
			    		   :chart-type="'pie'" 
			    		   :data="getData('D')"
			    		   :show-legend="true" 
			    		   :show-percents="true"
			    		   :total-rows="totalRows"
			    		   :data-tresh-hold="false" 					    		   
			    		   :fetching-data="fetchingData">	      		
			      	</chart>

			      	<!-- Rangos: cuando la categoria es numerica -->
			      	<!--<chart title="Por Edad" 
			    		   :chart-type="'bar'" 
			    		   :data="getData('G')"
			    		   :fetching-data="fetchingData"
			    		   :show-legend="false" 
			    		   :show-percents="false"
			    		   :data-tresh-hold="1"
			    		   :group-ranges="[
			    		   		[0,15],
			    		   		[16,50],
			    		   		[51,100],
			    		   		[100,Infinity]
			    		   ]"
			    		   >
			      	</chart>-->
				  			  
				</div>

				<div class="modal" :class="showModal ? 'is-active' : ''" >

				  <div class="modal-background"></div>
				  <div class="modal-card">
				    <header class="modal-card-head">
				      <button @click="showModal = false" class="modal-close is-large" aria-label="close"></button>
				    </header>
				    <section class="modal-card-body">
				      <iframe style="width:100%; height:500px;" :src="sheet_url"></iframe>
				    </section>				    
				  </div>

				</div>

		    </div>
		</section>
	
		<footer class="footer">
		  <div class="container">
		    <div class="content has-text-centered">
		      
		      <p>
		        <strong>
		        	Desarrollado con
		        	<fa-icon iconName="heart" ></fa-icon>
		        </strong> por
		        <a target="_blank" href="http://nan-apps.com">
		          nan-apps
		        </a>
		      </p>

		      <p>        
		        <strong>Con </strong>
		        <a target="_blank" href="http://vuejs.org">Vue.js</a> y         
		        <a target="_blank" href="http://bulma.io">Bulma</a>        
		      </p>

		      <p>
		        <a target="_blank" href="https://github.com/nan-apps/vue-sheet-graphs">
		          <span class="icon" >
		          	<fa-icon iconName="code" ></fa-icon>
		          </span> Código
		        </a>
		      </p>
		      
		    </div>
		  </div>
		</footer>

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