<template>
	<div class="column" :class="maximized ? 'is-full' : 'is-half'" >			    
		<div class="box">
			<nav class="level">
				<div class="level-left">	    		
					<p class="subtitle has-text-centered level-item" >
						{{title}}
					</p>		        
				</div>
				<div class="level-right" v-if="!fetchingData" >		      	        

					<div class="level-item" >
						<div class="field is-grouped">
							<div class="field has-addons" >
								<p class="control tooltip" data-tooltip="Moda torta">
									<a class="button is-small" @click="changeChartType('doughnut')">
										<span class="icon has-text-black" >
											<fa-icon iconName="chart-pie" ></fa-icon>
										</span>
									</a>
								</p>
								<p class="control tooltip" data-tooltip="Moda barras">
									<a class="button is-small" @click="changeChartType('bar')">
										<span class="icon has-text-black" >
											<fa-icon iconName="chart-bar" ></fa-icon>
										</span>
									</a>
								</p>
							</div>												
						</div>
					</div>
					<div class="level-item is-hidden-touch" >						
						<p class="control tooltip" :data-tooltip="maximized ? 'Minimizar' : 'Maximizar'">
							<a class="button is-small">
								<span class="icon is-small" @click="maximized = !maximized">
									<fa-icon :iconName="maximized ? 'window-minimize' : 'window-maximize'" ></fa-icon>
								</span> 
							</a>
						</p>						
					</div>

				</div>
			</nav>
			
			<div>
				<div v-if="fetchingData" class="has-text-centered has-text-grey" >
					<p>Obteniendo datos</p>
					<span class="icon is-large">
						<i class="fa fa-refresh fa-spin fa-2x has-text-grey-lighter"></i>
					</span>					      
				</div>

				<canvas v-show="!fetchingData" ></canvas>				
			</div>

		</div>

	</div>

</template>

<script>

	import Chart from 'chart.js';	
	import ChartDefaultConf from '../chart_conf.js';
	import FaIcon from './FaIcon.vue'

	export default { 
		data: function(){
			return {
				chart: null,
				ctx: null,
				maximized: false,
			}
		},   		
		props: ['chartType', 'data', 'title', 'fetchingData', 
			    'showLegend', 'dataTreshHold', 'showPercents', 'totalRows'],
		components: {
			FaIcon
		},
		mounted: function() {	 
			this.ctx = $(this.$el).find("canvas")[0];	
		}, 
		watch: {
			data: function ( newData ) {	

				if( newData ){		    				    		
					let defaultConf = jQuery.extend(true, {}, ChartDefaultConf); 		    		
					this.draw( 
						this.ctx, 
						this.buildConf(defaultConf, this.chartType, newData)
				    );
				}
			}
		},		
		methods: {
			draw: function( ctx, chartConf ){				

				if( this.chart ){					
					this.chart.destroy();
					this.chart = null;	
					$(this.ctx).show();					
				}				
				this.chart = new Chart( ctx, chartConf );									

			},
			buildConf: function( chartConf, chartType, data ){

				var self = this;				
				chartConf.type = chartType;
				
				let groupedData = _.groupBy(data.values);					
				_.forEach(groupedData, function(values, label) {	
					if( !self.dataTreshHold || values.length > self.dataTreshHold ){
						chartConf.data.labels.push( label );					
						chartConf.data.datasets[0].data.push( values.length );
					}
				});

				if( chartType == "doughnut" || chartType == 'pie' ){
					chartConf.options.scales.xAxes = [];
					chartConf.options.scales.yAxes = [];
				}

				chartConf.options.legend.display = self.showLegend;
				chartConf.options.plugins.datalabels.display = self.showPercents;
				
				if( self.showPercents && self.totalRows ){					
					chartConf.options.plugins.datalabels.formatter = (value, context) => {						
	                    return Math.round( (value / self.totalRows) *100) + '%';
	                }
				}

				return chartConf;
			},
			changeChartType: function(type) {				
				let defaultConf = jQuery.extend(true, {}, ChartDefaultConf); 		    		
				this.draw( this.ctx, 
						   this.buildConf(defaultConf, type, this.data) );
			}

		}, 
			    
	}

</script>

<style scoped>
	.tile{
		position: relative;
		
		margin: 10px;
		float: left;
	}
</style>
