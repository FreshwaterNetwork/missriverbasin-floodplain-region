define([
	"dojo/_base/declare"
],
function ( 	declare ) {
        "use strict";
        return declare(null, {
			makeVariables: function(t){	
				// map service URL
				t.url = "https://cirrus.tnc.org/arcgis/rest/services/FN_AGR/missRiverBasinFP/MapServer";
				// build top level controls
				t.topObj = {
					introP: "The Floodplains Prioritization Tool (FP Tool) is designed to identify critical opportunities for floodplain protection and restoration in the Mississippi River Basin. Use the selector widgets below to specify criteria related to water quality, wildlife habitat, and human exposure to flood risk. The map on the right will change in response to your selections to identify sites meeting these criteria and identify those geographies where floodplain restoration or conservation is likely to have the greatest positive impact on the health of this river system.",
					toggleBtns:{
						tb1:{
							header:"Select Flood Frequency",
							name:"floodFreq",
							btns:{
								b1:{
									id:"ff-1",
									value:"1",
									label:"1-in-5-year"
								},
								b2:{
									id:"ff-2",
									value:"2",
									label:"1-in-100-year"
								},
								b3:{
									id:"ff-3",
									value:"3",
									label:"1-in-500-year"
								}
							}	
						},
						tb2:{
							header:"View Floodplains By Watershed",
							name:"huc",
							btns:{
								b1:{
									id:"-h8",
									value:"0",
									label:"HUC-8"
								},
								b2:{
									id:"-h12",
									value:"1",
									label:"HUC-12"
								},
								b3:{
									id:"-catch",
									value:"2",
									label:"Catchment"
								}
							}
						},
						tb3:{
							header:"Select Management Action",
							name:"mngmtAction",
							btns:{
								b1:{
									id:"mact-1",
									value:"p",
									label:"Protection"
								},
								b2:{
									id:"mact-2",
									value:"r",
									label:"Restoration"
								}
							}
						}
					}
				}
				// object to build filter controls
				t.filterObj = {
					group0:{
						header: "Available Floodplain Area",
						controls:{
							con0:{
								type:"slider",
								field:"Acres",
								label:"Available floodplain area for given flood frequency and management action",
								unit:"acres",
								single:true
							}	
						}
					},
					group1:{
						header: "Nutrients",
						controls:{
							con0:{
								type:"slider",
								field:"ACCp",
								label:"Local Nutrient Loading (Nitrogen and Phosphorus)",
								unit:"%"
							},
							con1:{
								type:"slider",
								field:"DINp",
								label:"Nutrient loading to Gulf of Mexico (nitrogen and phosphorus)",
								unit:"%"
							},
							con2:{
								type:"slider",
								field:"GDDsP",
								label:"Growing degree days",
								unit:""
							}
						}
					},
					group2:{
						header:"Land Conversion",
						controls:{
							con0:{
								type:"slider",
								field:"CPI",
								label:"Agricultural Productivity Potential of Soils",
								unit:"",
								single:true
							}
						}
					},
					group3:{
						header:"Habitat",
						controls:{
							con0:{
								type:"radio",
								field:"inIBA",
								label:"Important Bird Areas"
							},
							con1:{
								type:"radio",
								field:"TNC",
								label:"Nature Conservancy Ecoregional Assessment Units"
							},
							con2:{
								type:"slider",
								field:"WT_TOT",
								label:"At-Risk Wetland Species",
								unit:""
							},
							con3:{
								type:"radio",
								field:"FWScrit",
								label:"USFWS Threatened & Endangered Species Active Critical Habitat"
							},
							con4:{
								type:"radio",
								field:"ABCcorr",
								label:"American Bird Conservancy Corridors & Key Habitat Bird Areas"
							},
							con5:{
								type:"slider",
								field:"cumu_hci",
								label:"National Fish Habitat Partnership Cumulative Habitat Condition Index",
								unit:""
							}
						}
					},
					group4:{
						header:"Population Exposure",
						controls:{
							con0:{
								type:"slider",
								field:"popnow",
								label:"Population Exposed to Floods (Present-Day)",
								unit:""
							},
							con1:{
								type:"slider",
								field:"pop2050",
								label:"Population Exposed to Floods (2050)",
								unit:""
							}
						}		
					},
					group5:{
						header:"Flood Damages",
						controls:{
							con0:{
								type:"slider",
								field:"P2_2050",
								label:"Potential Future Flood Damages to Structures (2050) ($)",
								unit:""
							}
						}
					},
					group6:{
						header:"Social Vulnerability",
						controls:{
							con0:{
								type:"slider",
								field:"SOVI",
								label:"Index of Social Vulnerability to Environmental Hazards",
								unit:""
							}
						}
					}
				}
				// object to build supporting layers
				t.supportingLayersObj = {
					visible:true,
					controls:{
						con0:{
							value:"3",
							label:"100 Year Floodplain"
						}
					}
				}

				// definition expression root field names
				t.exp = {
					Acres:"", ACCp:"", DINp:"", GDDsP:"", CPI:"", inIBA:"", TNC:"", WT_TOT:"", FWScrit:"", ABCcorr:"", cumu_hci:"", popnow:"", pop2050:"", P2_2050:"", SOVI:""
				}
				// object for range slider
				t.sliderObj = {
					// huc 8 + protection + 1 in 5 year flood
					h8p1:{
						Acres:{
							values:[], vis:true, min:0, max:50000, gtmax:true,
							info:"<b>Available floodplain area for given flood frequency and management action</b><br>Area of floodplain in forest, wetland, or grassland that is not currently in protected status."
						}, 
						ACCp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Local Nutrient Loading (Nitrogen and Phosphorus)</b><br>Kg/yr of nitrogen and phosphorus exported at the mouth of the catchment, accounting for accumulation from upstream, and divided by the total upstream area (km2), all normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						DINp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (nitrogen and phosphorus)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches the Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						GDDsP:{
							values:[], vis:true, min:0, max:100, 
							info:"<b>Growing degree days</b><br>Accumulated growing degree days for 2016-2017, normalized to a 0-100 scale. May be used in conjunction with &#x22;local nutrient loading&#x22; slider above to identify 5-year-floodplain with high loading and high growing degree days, i.e. high denitrification potential."
						}, 
						CPI:{
							vis:false
						}, 
						WT_TOT:{
							values:[], vis:true, min:0, max:75, shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/ESN/Totalnumberofatriskwetlandspecies.pdf' target='_blank'>More Info</a>"
						}, 
						cumu_hci:{
							values:[], vis:true, min:1.223, max:4.385, step:0.001, shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments <i>higher</i> in this metric, i.e. with less extreme stressors. <a href='http://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
						}, 
						popnow:{
							values:[], vis:true, min:0, max:151, gtmax:true,
							info:"<b>Population Exposed to Floods (Present-Day)</b><br>People currently living in forest/wetland floodplain of the selected flood frequency. <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						}, 
						pop2050:{
							values:[], vis:true, min:0, max:3501, gtmax:true,
							info:"<b>Population Exposed to Floods (2050)</b><br>People expected to be living in forest/wetland/grassland floodplain of the selected flood frequency in 2050. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						P2_2050:{
							values:[], vis:true, min:0, max:200000000, gtmax:true, 
							info:"<b>Potential Future Flood Damages to Structures (2050) ($)</b><br>Estimate of property damage in the floodplain corresponding to the selected flood frequency and management action, given flood depth and projected 2050 land use / building type. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						
						SOVI:{
							values:[], vis:true, min:-2.277, max:4.110,  step:0.001, shfld:true,
							info:"<b>Index of Social Vulnerability to Environmental Hazards</b><br>Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. <a href='http://artsandsciences.sc.edu/geog/hvri/faq' target='_blank'>More Info</a>"
						}
					},
					// huc 8 + protection + 1 in 100 year flood
					h8p2:{
						Acres:{
							values:[], vis:true, min:0, max:200000, gtmax:true,
							info:"<b>Available floodplain area for given flood frequency and management action</b><br>Area of floodplain in forest, wetland, or grassland that is not currently in protected status."
						},
						ACCp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Local Nutrient Loading (Nitrogen and Phosphorus)</b><br>Kg/yr of nitrogen and phosphorus exported at the mouth of the catchment, accounting for accumulation from upstream, and divided by the total upstream area (km2), all normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						DINp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (nitrogen and phosphorus)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches the Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						GDDsP:{
							vis:false
						}, 
						CPI:{
							vis:false
						}, 
						WT_TOT:{
							values:[], vis:true, min:0, max:75, shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/ESN/Totalnumberofatriskwetlandspecies.pdf' target='_blank'>More Info</a>"
						}, 
						cumu_hci:{
							values:[], vis:true, min:1.223, max:4.385, step:0.001, shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments <i>higher</i> in this metric, i.e. with less extreme stressors. <a href='http://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
						}, 
						popnow:{
							values:[], vis:true, min:0, max:251, gtmax:true,
							info:"<b>Population Exposed to Floods (Present-Day)</b><br>People currently living in forest/wetland floodplain of the selected flood frequency. <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						}, 
						pop2050:{
							values:[], vis:true, min:0, max:8501, gtmax:true,
							info:"<b>Population Exposed to Floods (2050)</b><br>People expected to be living in forest/wetland/grassland floodplain of the selected flood frequency in 2050. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						P2_2050:{
							values:[], vis:true, min:0, max:1000000000, gtmax:true,
							info:"<b>Potential Future Flood Damages to Structures (2050) ($)</b><br>Estimate of property damage in the floodplain corresponding to the selected flood frequency and management action, given flood depth and projected 2050 land use / building type. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						SOVI:{
							values:[], vis:true, min:-2.277, max:4.110,  step:0.001, shfld:true,
							info:"<b>Index of Social Vulnerability to Environmental Hazards</b><br>Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. <a href='http://artsandsciences.sc.edu/geog/hvri/faq' target='_blank'>More Info</a>"
						}
					},
					// huc 8 + protection + 1 in 500 year flood
					h8p3:{
						Acres:{
							values:[], vis:true, min:0,	max:200000, gtmax:true,
							info:"<b>Available floodplain area for given flood frequency and management action</b><br>Area of floodplain in forest, wetland, or grassland that is not currently in protected status."
						}, 
						ACCp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Local Nutrient Loading (Nitrogen and Phosphorus)</b><br>Kg/yr of nitrogen and phosphorus exported at the mouth of the catchment, accounting for accumulation from upstream, and divided by the total upstream area (km2), all normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						DINp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (nitrogen and phosphorus)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches the Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						GDDsP:{
							vis:false
						}, 
						CPI:{
							vis:false
						}, 
						WT_TOT:{
							values:[], vis:true, min:0, max:75, shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/ESN/Totalnumberofatriskwetlandspecies.pdf' target='_blank'>More Info</a>"
						}, 
						cumu_hci:{
							values:[], vis:true, min:1.223, max:4.385, step:0.001, shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments <i>higher</i> in this metric, i.e. with less extreme stressors. <a href='http://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
						}, 
						popnow:{
							values:[], vis:true, min:0, max:301, gtmax:true,
							info:"<b>Population Exposed to Floods (Present-Day)</b><br>People currently living in forest/wetland floodplain of the selected flood frequency. <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						}, 
						pop2050:{
							values:[], vis:true, min:0, max:10001, gtmax:true,
							info:"<b>Population Exposed to Floods (2050)</b><br>People expected to be living in forest/wetland/grassland floodplain of the selected flood frequency in 2050. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						P2_2050:{
							values:[], vis:true, min:0, max:1250000000, gtmax:true, 
							info:"<b>Potential Future Flood Damages to Structures (2050) ($)</b><br>Estimate of property damage in the floodplain corresponding to the selected flood frequency and management action, given flood depth and projected 2050 land use / building type. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						
						SOVI:{
							values:[], vis:true, min:-2.277, max:4.110,  step:0.001, shfld:true,
							info:"<b>Index of Social Vulnerability to Environmental Hazards</b><br>Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. <a href='http://artsandsciences.sc.edu/geog/hvri/faq' target='_blank'>More Info</a>"
						}
					},
					// huc 8 + restoration + 1 in 5 year flood
					h8r1:{
						Acres:{
							values:[], vis:true, min:0, max:40000, gtmax:true,
							info:"<b>Available floodplain area for given flood frequency and management action</b><br>Area of floodplain in ag or pasture land that could potentially be restored"
						}, 
						ACCp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Local Nutrient Loading (Nitrogen and Phosphorus)</b><br>Kg/yr of nitrogen and phosphorus exported at the mouth of the catchment, accounting for accumulation from upstream, and divided by the total upstream area (km2), all normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						DINp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (nitrogen and phosphorus)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches the Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher<i/> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						GDDsP:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Growing degree days</b><br>Accumulated growing degree days for 2016-2017, normalized to a 0-100 scale. May be used in conjunction with &#x22;local nutrient loading&#x22; slider above to identify 5-year-floodplain with high loading and high growing degree days, i.e. high denitrification potential."
						}, 
						CPI:{
							values:[], vis:true, min:0, max:0.708, step:0.001,
							info:"<b>Agricultural Productivity Potential of Soils</b><br>An index characterizing soil's inherent capacity to produce non-irrigated commodity crops (0 - 1). Lower value suggests less productive soil, and therefore more viable opportunity for restoration."
						}, 
						WT_TOT:{
							values:[], vis:true, min:0, max:75, shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/ESN/Totalnumberofatriskwetlandspecies.pdf' target='_blank'>More Info</a>"
						}, 
						cumu_hci:{
							values:[], vis:true, min:1.224, max:4.385, step:0.001, shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For restoration priorities, identify catchments <i>lower</i> in this metric, i.e. with more extreme stressors. <a href='http://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
						}, 
						popnow:{
							values:[], vis:true, min:0, max:151, gtmax:true,
							info:"<b>Population Exposed to Floods (Present-Day)</b><br>People currently living in ag or pasture land that is in a floodplain of the selected flood frequency. <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						}, 
						pop2050:{
							values:[], vis:true, min:0, max:3001, gtmax:true,
							info:"<b>Population exposed to floods (2050)</b><br>People expected in 2050 to be living in ag or pasture land that is in a floodplain of the selected flood frequency. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						P2_2050:{
							values:[], vis:true, min:0, max:75000000, gtmax:true, 
							info:"<b>Potential Future Flood Damages to Structures (2050) ($)</b><br>Estimate of property damage in the floodplain corresponding to the selected flood frequency and management action, given flood depth and projected 2050 land use / building type. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						SOVI:{
							values:[], vis:true, min:-2.277, max:4.110,  step:0.001, shfld:true,
							info:"<b>Index of Social Vulnerability to Environmental Hazards</b><br>Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. <a href='http://artsandsciences.sc.edu/geog/hvri/faq' target='_blank'>More Info</a>"
						}
					},
					// huc 8 + restoration + 1 in 100 year flood
					h8r2:{
						Acres:{
							values:[], vis:true, min:0, max:300000, gtmax:true,
							info:"<b>Available floodplain area for given flood frequency and management action</b><br>Area of floodplain in ag or pasture land that could potentially be restored"
						}, 
						ACCp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Local Nutrient Loading (Nitrogen and Phosphorus)</b><br>Kg/yr of nitrogen and phosphorus exported at the mouth of the catchment, accounting for accumulation from upstream, and divided by the total upstream area (km2), all normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						DINp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (nitrogen and phosphorus)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches the Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher<i/> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						GDDsP:{
							vis:false
						}, 
						CPI:{
							values:[], vis:true, min:0, max:0.697, step:0.001,
							info:"<b>Agricultural Productivity Potential of Soils</b><br>An index characterizing soil's inherent capacity to produce non-irrigated commodity crops (0 - 1). Lower value suggests less productive soil, and therefore more viable opportunity for restoration."
						}, 
						WT_TOT:{
							values:[], vis:true, min:0, max:75, shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/ESN/Totalnumberofatriskwetlandspecies.pdf' target='_blank'>More Info</a>"
						}, 
						cumu_hci:{
							values:[], vis:true, min:1.223, max:4.385, step:0.001, shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For restoration priorities, identify catchments <i>lower</i> in this metric, i.e. with more extreme stressors. <a href='http://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
						}, 
						popnow:{
							values:[], vis:true, min:0, max:351, gtmax:true,
							info:"<b>Population Exposed to Floods (Present-Day)</b><br>People currently living in ag or pasture land that is in a floodplain of the selected flood frequency. <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						}, 
						pop2050:{
							values:[], vis:true, min:0, max:15001, gtmax:true,
							info:"<b>Population exposed to floods (2050)</b><br>People expected in 2050 to be living in ag or pasture land that is in a floodplain of the selected flood frequency. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						P2_2050:{
							values:[], vis:true, min:0, max:1000000000, gtmax:true, 
							info:"<b>Potential Future Flood Damages to Structures (2050) ($)</b><br>Estimate of property damage in the floodplain corresponding to the selected flood frequency and management action, given flood depth and projected 2050 land use / building type. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						SOVI:{
							values:[], vis:true, min:-2.277, max:4.110,  step:0.001, shfld:true,
							info:"<b>Index of Social Vulnerability to Environmental Hazards</b><br>Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. <a href='http://artsandsciences.sc.edu/geog/hvri/faq' target='_blank'>More Info</a>"
						}
					},
					// huc 8 + restoration + 1 in 500 year flood
					h8r3:{
						Acres:{
							values:[], vis:true, min:0, max:500000, gtmax:true,
							info:"<b>Available floodplain area for given flood frequency and management action</b><br>Area of floodplain in ag or pasture land that could potentially be restored"
						}, 
						ACCp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Local Nutrient Loading (Nitrogen and Phosphorus)</b><br>Kg/yr of nitrogen and phosphorus exported at the mouth of the catchment, accounting for accumulation from upstream, and divided by the total upstream area (km2), all normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						DINp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (nitrogen and phosphorus)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches the Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher<i/> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						GDDsP:{
							vis:false
						}, 
						CPI:{
							values:[], vis:true, min:0, max:0.692, step:0.001,
							info:"<b>Agricultural Productivity Potential of Soils</b><br>An index characterizing soil's inherent capacity to produce non-irrigated commodity crops (0 - 1). Lower value suggests less productive soil, and therefore more viable opportunity for restoration."
						}, 
						WT_TOT:{
							values:[], vis:true, min:0, max:75, shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/ESN/Totalnumberofatriskwetlandspecies.pdf' target='_blank'>More Info</a>"
						}, 
						cumu_hci:{
							values:[], vis:true, min:1.224, max:4.385, step:0.001, shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For restoration priorities, identify catchments <i>lower</i> in this metric, i.e. with more extreme stressors. <a href='http://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
						}, 
						popnow:{
							values:[], vis:true, min:0, max:501, gtmax:true,
							info:"<b>Population Exposed to Floods (Present-Day)</b><br>People currently living in ag or pasture land that is in a floodplain of the selected flood frequency. <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						}, 
						pop2050:{
							values:[], vis:true, min:0, max:20001, gtmax:true,
							info:"<b>Population exposed to floods (2050)</b><br>People expected in 2050 to be living in ag or pasture land that is in a floodplain of the selected flood frequency. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						P2_2050:{
							values:[], vis:true, min:0, max:1500000000, gtmax:true,
							info:"<b>Potential Future Flood Damages to Structures (2050) ($)</b><br>Estimate of property damage in the floodplain corresponding to the selected flood frequency and management action, given flood depth and projected 2050 land use / building type. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						SOVI:{
							values:[], vis:true, min:-2.277, max:4.110,  step:0.001, shfld:true,
							info:"<b>Index of Social Vulnerability to Environmental Hazards</b><br>Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. <a href='http://artsandsciences.sc.edu/geog/hvri/faq' target='_blank'>More Info</a>"
						}
					},
					// huc 12 + protection + 1 in 5 year flood
					h12p1:{
						Acres:{
							values:[], vis:true, min:0, max:2500, gtmax:true,
							info:"<b>Available floodplain area for given flood frequency and management action</b><br>Area of floodplain in forest, wetland, or grassland that is not currently in protected status."
						}, 
						ACCp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Local Nutrient Loading (Nitrogen and Phosphorus)</b><br>Kg/yr of nitrogen and phosphorus exported at the mouth of the catchment, accounting for accumulation from upstream, and divided by the total upstream area (km2), all normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						DINp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (nitrogen and phosphorus)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches the Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						GDDsP:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Growing degree days</b><br>Accumulated growing degree days for 2016-2017, normalized to a 0-100 scale. May be used in conjunction with &#x22;local nutrient loading&#x22; slider above to identify 5-year-floodplain with high loading and high growing degree days, i.e. high denitrification potential."
						}, 
						CPI:{
							vis:false
						}, 
						WT_TOT:{
							values:[], vis:true, min:0, max:8, shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/ESN/Totalnumberofatriskwetlandspecies.pdf' target='_blank'>More Info</a>"
						}, 
						cumu_hci:{
							values:[], vis:true, min:0.999, max:5.001, step:0.001, shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments <i>higher</i> in this metric, i.e. with less extreme stressors. <a href='http://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
						}, 
						popnow:{
							values:[], vis:true, min:0, max:11, gtmax:true,
							info:"<b>Population Exposed to Floods (Present-Day)</b><br>People currently living in forest/wetland floodplain of the selected flood frequency. <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						}, 
						pop2050:{
							values:[], vis:true, min:0, max:501, gtmax:true,
							info:"<b>Population Exposed to Floods (2050)</b><br>People expected to be living in forest/wetland/grassland floodplain of the selected flood frequency in 2050. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						P2_2050:{
							values:[], vis:true, min:0, max:25000000, gtmax:true,
							info:"<b>Potential Future Flood Damages to Structures (2050) ($)</b><br>Estimate of property damage in the floodplain corresponding to the selected flood frequency and management action, given flood depth and projected 2050 land use / building type. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						SOVI:{
							values:[], vis:true, min:-5.019, max:7.150,  step:0.001, shfld:true,
							info:"<b>Index of Social Vulnerability to Environmental Hazards</b><br>Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. <a href='http://artsandsciences.sc.edu/geog/hvri/faq' target='_blank'>More Info</a>"
						}
					},
					// huc 12 + protection + 1 in 100 year flood
					h12p2:{
						Acres:{
							values:[], vis:true, min:0, max:2500, gtmax:true,
							info:"<b>Available floodplain area for given flood frequency and management action</b><br>Area of floodplain in forest, wetland, or grassland that is not currently in protected status."
						}, 
						ACCp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Local Nutrient Loading (Nitrogen and Phosphorus)</b><br>Kg/yr of nitrogen and phosphorus exported at the mouth of the catchment, accounting for accumulation from upstream, and divided by the total upstream area (km2), all normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						DINp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (nitrogen and phosphorus)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches the Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						GDDsP:{
							vis:false
						}, 
						CPI:{
							vis:false
						}, 
						WT_TOT:{
							values:[], vis:true, min:0, max:8, shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/ESN/Totalnumberofatriskwetlandspecies.pdf' target='_blank'>More Info</a>"
						}, 
						cumu_hci:{
							values:[], vis:true, min:0.999, max:5.001, step:0.001, shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments <i>higher</i> in this metric, i.e. with less extreme stressors. <a href='http://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
						}, 
						popnow:{
							values:[], vis:true, min:0, max:11, gtmax:true,
							info:"<b>Population Exposed to Floods (Present-Day)</b><br>People currently living in forest/wetland floodplain of the selected flood frequency. <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						}, 
						pop2050:{
							values:[], vis:true, min:0, max:1001, gtmax:true,
							info:"<b>Population Exposed to Floods (2050)</b><br>People expected to be living in forest/wetland/grassland floodplain of the selected flood frequency in 2050. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						P2_2050:{
							values:[], vis:true, min:0, max:50000000, gtmax:true,
							info:"<b>Potential Future Flood Damages to Structures (2050) ($)</b><br>Estimate of property damage in the floodplain corresponding to the selected flood frequency and management action, given flood depth and projected 2050 land use / building type. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						SOVI:{
							values:[], vis:true, min:-5.019, max:7.150,  step:0.001, shfld:true,
							info:"<b>Index of Social Vulnerability to Environmental Hazards</b><br>Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. <a href='http://artsandsciences.sc.edu/geog/hvri/faq' target='_blank'>More Info</a>"
						}
					},
					// huc 12 + protection + 1 in 500 year flood
					h12p3:{
						Acres:{
							values:[], vis:true, min:0, max:2500, gtmax:true,
							info:"<b>Available floodplain area for given flood frequency and management action</b><br>Area of floodplain in forest, wetland, or grassland that is not currently in protected status."
						}, 
						ACCp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Local Nutrient Loading (Nitrogen and Phosphorus)</b><br>Kg/yr of nitrogen and phosphorus exported at the mouth of the catchment, accounting for accumulation from upstream, and divided by the total upstream area (km2), all normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						DINp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (nitrogen and phosphorus)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches the Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						GDDsP:{
							vis:false
						}, 
						CPI:{
							vis:false
						}, 
						WT_TOT:{
							values:[],vis:true,min:0,max:8,shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/ESN/Totalnumberofatriskwetlandspecies.pdf' target='_blank'>More Info</a>"
						}, 
						cumu_hci:{
							values:[], vis:true, min:0.999, max:5.001, step:0.001, shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments <i>higher</i> in this metric, i.e. with less extreme stressors. <a href='http://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
						}, 
						popnow:{
							values:[], vis:true, min:0, max:11, gtmax:true,
							info:"<b>Population Exposed to Floods (Present-Day)</b><br>People currently living in forest/wetland floodplain of the selected flood frequency. <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						}, 
						pop2050:{
							values:[], vis:true, min:0, max:1001, gtmax:true,
							info:"<b>Population Exposed to Floods (2050)</b><br>People expected to be living in forest/wetland/grassland floodplain of the selected flood frequency in 2050. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						P2_2050:{
							values:[], vis:true, min:0, max:50000000, gtmax:true,
							info:"<b>Potential Future Flood Damages to Structures (2050) ($)</b><br>Estimate of property damage in the floodplain corresponding to the selected flood frequency and management action, given flood depth and projected 2050 land use / building type. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						SOVI:{
							values:[], vis:true, min:-5.019, max:7.150,  step:0.001, shfld:true,
							info:"<b>Index of Social Vulnerability to Environmental Hazards</b><br>Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. <a href='http://artsandsciences.sc.edu/geog/hvri/faq' target='_blank'>More Info</a>"
						}
					},
					// huc 12 + restoration + 1 in 5 year flood
					h12r1:{
						Acres:{
							values:[], vis:true, min:0, max:2500, gtmax:true,
							info:"<b>Available floodplain area for given flood frequency and management action</b><br>Area of floodplain in ag or pasture land that could potentially be restored"
						}, 
						ACCp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Local Nutrient Loading (Nitrogen and Phosphorus)</b><br>Kg/yr of nitrogen and phosphorus exported at the mouth of the catchment, accounting for accumulation from upstream, and divided by the total upstream area (km2), all normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						DINp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (nitrogen and phosphorus)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches the Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher<i/> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						GDDsP:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Growing degree days</b><br>Accumulated growing degree days for 2016-2017, normalized to a 0-100 scale. May be used in conjunction with &#x22;local nutrient loading&#x22; slider above to identify 5-year-floodplain with high loading and high growing degree days, i.e. high denitrification potential."
						}, 
						CPI:{
							values:[],vis:true,min:0,max:0.808,step:0.001,
							info:"<b>Agricultural Productivity Potential of Soils</b><br>An index characterizing soil's inherent capacity to produce non-irrigated commodity crops (0 - 1). Lower value suggests less productive soil, and therefore more viable opportunity for restoration."
						},
						WT_TOT:{
							values:[],vis:true,min:0,max:8,shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/ESN/Totalnumberofatriskwetlandspecies.pdf' target='_blank'>More Info</a>"
						}, 
						cumu_hci:{
							values:[], vis:true, min:0.999, max:5.001, step:0.001, shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For restoration priorities, identify catchments <i>lower</i> in this metric, i.e. with more extreme stressors. <a href='http://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
						}, 
						popnow:{
							values:[], vis:true, min:0, max:11, gtmax:true,
							info:"<b>Population Exposed to Floods (Present-Day)</b><br>People currently living in ag or pasture land that is in a floodplain of the selected flood frequency. <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						}, 
						pop2050:{
							values:[], vis:true, min:0, max:501, gtmax:true,
							info:"<b>Population exposed to floods (2050)</b><br>People expected in 2050 to be living in ag or pasture land that is in a floodplain of the selected flood frequency. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						P2_2050:{
							values:[], vis:true, min:0, max:10000000, gtmax:true, 
							info:"<b>Potential Future Flood Damages to Structures (2050) ($)</b><br>Estimate of property damage in the floodplain corresponding to the selected flood frequency and management action, given flood depth and projected 2050 land use / building type. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						SOVI:{
							values:[], vis:true, min:-5.019, max:7.150,  step:0.001, shfld:true,
							info:"<b>Index of Social Vulnerability to Environmental Hazards</b><br>Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. <a href='http://artsandsciences.sc.edu/geog/hvri/faq' target='_blank'>More Info</a>"
						}
					},
					// huc 12 + restoration + 1 in 100 year flood
					h12r2:{
						Acres:{
							values:[], vis:true, min:0, max:6000, gtmax:true,
							info:"<b>Available floodplain area for given flood frequency and management action</b><br>Area of floodplain in ag or pasture land that could potentially be restored"
						}, 
						ACCp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Local Nutrient Loading (Nitrogen and Phosphorus)</b><br>Kg/yr of nitrogen and phosphorus exported at the mouth of the catchment, accounting for accumulation from upstream, and divided by the total upstream area (km2), all normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						DINp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (nitrogen and phosphorus)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches the Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher<i/> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						GDDsP:{
							vis:false
						}, 
						CPI:{
							values:[],vis:true,min:0,max:0.791,step:0.001,
							info:"<b>Agricultural Productivity Potential of Soils</b><br>An index characterizing soil's inherent capacity to produce non-irrigated commodity crops (0 - 1). Lower value suggests less productive soil, and therefore more viable opportunity for restoration."
						}, 
						WT_TOT:{
							values:[],vis:true,min:0,max:8,shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/ESN/Totalnumberofatriskwetlandspecies.pdf' target='_blank'>More Info</a>"
						}, 
						cumu_hci:{
							values:[], vis:true, min:0.999, max:5.001, step:0.001, shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For restoration priorities, identify catchments <i>lower</i> in this metric, i.e. with more extreme stressors. <a href='http://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
						}, 
						popnow:{
							values:[], vis:true, min:0, max:26, gtmax:true,
							info:"<b>Population Exposed to Floods (Present-Day)</b><br>People currently living in ag or pasture land that is in a floodplain of the selected flood frequency. <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						}, 
						pop2050:{
							values:[], vis:true, min:0, max:1501, gtmax:true,
							info:"<b>Population exposed to floods (2050)</b><br>People expected in 2050 to be living in ag or pasture land that is in a floodplain of the selected flood frequency. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						P2_2050:{
							values:[], vis:true, min:0, max:50000000, gtmax:true,
							info:"<b>Potential Future Flood Damages to Structures (2050) ($)</b><br>Estimate of property damage in the floodplain corresponding to the selected flood frequency and management action, given flood depth and projected 2050 land use / building type. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						SOVI:{
							values:[], vis:true, min:-5.019, max:7.150,  step:0.001, shfld:true,
							info:"<b>Index of Social Vulnerability to Environmental Hazards</b><br>Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. <a href='http://artsandsciences.sc.edu/geog/hvri/faq' target='_blank'>More Info</a>"
						}
					},
					// huc 12 + restoration + 1 in 500 year flood
					h12r3:{
						Acres:{
							values:[], vis:true, min:0, max:15000, gtmax:true,
							info:"<b>Available floodplain area for given flood frequency and management action</b><br>Area of floodplain in ag or pasture land that could potentially be restored"
						}, 
						ACCp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Local Nutrient Loading (Nitrogen and Phosphorus)</b><br>Kg/yr of nitrogen and phosphorus exported at the mouth of the catchment, accounting for accumulation from upstream, and divided by the total upstream area (km2), all normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						DINp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (nitrogen and phosphorus)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches the Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher<i/> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						GDDsP:{
							vis:false
						}, 
						CPI:{
							values:[],vis:true,min:0,max:0.788,step:0.001,
							info:"<b>Agricultural Productivity Potential of Soils</b><br>An index characterizing soil's inherent capacity to produce non-irrigated commodity crops (0 - 1). Lower value suggests less productive soil, and therefore more viable opportunity for restoration."
						}, 
						WT_TOT:{
							values:[],vis:true,min:0,max:8,shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/ESN/Totalnumberofatriskwetlandspecies.pdf' target='_blank'>More Info</a>"
						}, 
						cumu_hci:{
							values:[], vis:true, min:0.999, max:5.001, step:0.001, shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For restoration priorities, identify catchments <i>lower</i> in this metric, i.e. with more extreme stressors. <a href='http://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
						}, 
						popnow:{
							values:[], vis:true, min:0, max:26, gtmax:true,
							info:"<b>Population Exposed to Floods (Present-Day)</b><br>People currently living in ag or pasture land that is in a floodplain of the selected flood frequency. <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						}, 
						pop2050:{
							values:[], vis:true, min:0, max:1501, gtmax:true,
							info:"<b>Population exposed to floods (2050)</b><br>People expected in 2050 to be living in ag or pasture land that is in a floodplain of the selected flood frequency. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						P2_2050:{
							values:[], vis:true, min:0, max:50000000, gtmax:true,
							info:"<b>Potential Future Flood Damages to Structures (2050) ($)</b><br>Estimate of property damage in the floodplain corresponding to the selected flood frequency and management action, given flood depth and projected 2050 land use / building type. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},						
						SOVI:{
							values:[], vis:true, min:-5.019, max:7.150,  step:0.001, shfld:true,
							info:"<b>Index of Social Vulnerability to Environmental Hazards</b><br>Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. <a href='http://artsandsciences.sc.edu/geog/hvri/faq' target='_blank'>More Info</a>"
						}
					},
					// catchment + protection + 1 in 5 year flood
					catchp1:{
						Acres:{
							values:[], vis:true, min:0, max:250, gtmax:true,
							info:"<b>Available floodplain area for given flood frequency and management action</b><br>Area of floodplain in forest, wetland, or grassland that is not currently in protected status."
						}, 
						ACCp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Local Nutrient Loading (Nitrogen and Phosphorus)</b><br>Kg/yr of nitrogen and phosphorus exported at the mouth of the catchment, accounting for accumulation from upstream, and divided by the total upstream area (km2), all normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						DINp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (nitrogen and phosphorus)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches the Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						GDDsP:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Growing degree days</b><br>Accumulated growing degree days for 2016-2017, normalized to a 0-100 scale. May be used in conjunction with &#x22;local nutrient loading&#x22; slider above to identify 5-year-floodplain with high loading and high growing degree days, i.e. high denitrification potential."
						}, 
						CPI:{
							vis:false
						}, 
						WT_TOT:{
							values:[],vis:true,min:0,max:8,shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/ESN/Totalnumberofatriskwetlandspecies.pdf' target='_blank'>More Info</a>"
						}, 
						cumu_hci:{
							values:[], vis:true, min:0.999, max:5.001, step:0.001, shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments <i>higher</i> in this metric, i.e. with less extreme stressors. <a href='http://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
						}, 
						popnow:{
							values:[], vis:true, min:1, max:11, gtmax:true,
							info:"<b>Population Exposed to Floods (Present-Day)</b><br>People currently living in forest/wetland floodplain of the selected flood frequency. <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						}, 
						pop2050:{
							values:[], vis:true, min:1, max:501, gtmax:true,
							info:"<b>Population Exposed to Floods (2050)</b><br>People expected to be living in forest/wetland/grassland floodplain of the selected flood frequency in 2050. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						P2_2050:{
							values:[], vis:true, min:0, max:350000, gtmax:true, 
							info:"<b>Potential Future Flood Damages to Structures (2050) ($)</b><br>Estimate of property damage in the floodplain corresponding to the selected flood frequency and management action, given flood depth and projected 2050 land use / building type. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},						
						SOVI:{
							values:[], vis:true, min:-7.051, max:8.536,  step:0.001, shfld:true,
							info:"<b>Index of Social Vulnerability to Environmental Hazards</b><br>Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. <a href='http://artsandsciences.sc.edu/geog/hvri/faq' target='_blank'>More Info</a>"
						}
					},
					// catchment + protection + 1 in 100 year flood
					catchp2:{
						Acres:{
							values:[], vis:true, min:0, max:250, gtmax:true,
							info:"<b>Available floodplain area for given flood frequency and management action</b><br>Area of floodplain in forest, wetland, or grassland that is not currently in protected status."
						}, 
						ACCp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Local Nutrient Loading (Nitrogen and Phosphorus)</b><br>Kg/yr of nitrogen and phosphorus exported at the mouth of the catchment, accounting for accumulation from upstream, and divided by the total upstream area (km2), all normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						DINp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (nitrogen and phosphorus)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches the Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						GDDsP:{
							vis:false
						}, 
						CPI:{
							vis:false
						}, 
						WT_TOT:{
							values:[],vis:true,min:0,max:8,shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/ESN/Totalnumberofatriskwetlandspecies.pdf' target='_blank'>More Info</a>"
						}, 
						cumu_hci:{
							values:[], vis:true, min:0.999, max:5.001, step:0.001, shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments <i>higher</i> in this metric, i.e. with less extreme stressors. <a href='http://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
						}, 
						popnow:{
							values:[], vis:true, min:1, max:11, gtmax:true,
							info:"<b>Population Exposed to Floods (Present-Day)</b><br>People currently living in forest/wetland floodplain of the selected flood frequency. <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						}, 
						pop2050:{
							values:[], vis:true, min:1, max:501, gtmax:true,
							info:"<b>Population Exposed to Floods (2050)</b><br>People expected to be living in forest/wetland/grassland floodplain of the selected flood frequency in 2050. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						P2_2050:{
							values:[], vis:true, min:0, max:1000000, gtmax:true, 
							info:"<b>Potential Future Flood Damages to Structures (2050) ($)</b><br>Estimate of property damage in the floodplain corresponding to the selected flood frequency and management action, given flood depth and projected 2050 land use / building type. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},						
						SOVI:{
							values:[], vis:true, min:-7.051, max:8.536,  step:0.001, shfld:true,
							info:"<b>Index of Social Vulnerability to Environmental Hazards</b><br>Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. <a href='http://artsandsciences.sc.edu/geog/hvri/faq' target='_blank'>More Info</a>"
						}
					},
					// catchment + protection + 1 in 500 year flood
					catchp3:{
						Acres:{
							values:[], vis:true, min:0, max:250, gtmax:true,
							info:"<b>Available floodplain area for given flood frequency and management action</b><br>Area of floodplain in forest, wetland, or grassland that is not currently in protected status."
						}, 
						ACCp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Local Nutrient Loading (Nitrogen and Phosphorus)</b><br>Kg/yr of nitrogen and phosphorus exported at the mouth of the catchment, accounting for accumulation from upstream, and divided by the total upstream area (km2), all normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						DINp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (nitrogen and phosphorus)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches the Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						GDDsP:{
							vis:false
						}, 
						CPI:{
							vis:false
						}, 
						WT_TOT:{
							values:[],vis:true,min:0,max:8,shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/ESN/Totalnumberofatriskwetlandspecies.pdf' target='_blank'>More Info</a>"
						}, 
						cumu_hci:{
							values:[], vis:true, min:0.999, max:5.001, step:0.001, shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments <i>higher</i> in this metric, i.e. with less extreme stressors. <a href='http://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
						}, 
						popnow:{
							values:[], vis:true, min:1, max:11, gtmax:true,
							info:"<b>Population Exposed to Floods (Present-Day)</b><br>People currently living in forest/wetland floodplain of the selected flood frequency. <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						}, 
						pop2050:{
							values:[], vis:true, min:1, max:501, gtmax:true,
							info:"<b>Population Exposed to Floods (2050)</b><br>People expected to be living in forest/wetland/grassland floodplain of the selected flood frequency in 2050. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						P2_2050:{
							values:[], vis:true, min:0, max:1000000, gtmax:true,
							info:"<b>Potential Future Flood Damages to Structures (2050) ($)</b><br>Estimate of property damage in the floodplain corresponding to the selected flood frequency and management action, given flood depth and projected 2050 land use / building type. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},						
						SOVI:{
							values:[], vis:true, min:-7.051, max:8.536,  step:0.001, shfld:true,
							info:"<b>Index of Social Vulnerability to Environmental Hazards</b><br>Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. <a href='http://artsandsciences.sc.edu/geog/hvri/faq' target='_blank'>More Info</a>"
						}
					},
					// catchment + restoration + 1 in 5 year flood
					catchr1:{
						Acres:{
							values:[], vis:true, min:0, max:250, gtmax:true,
							info:"<b>Available floodplain area for given flood frequency and management action</b><br>Area of floodplain in ag or pasture land that could potentially be restored"
						}, 
						ACCp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Local Nutrient Loading (Nitrogen and Phosphorus)</b><br>Kg/yr of nitrogen and phosphorus exported at the mouth of the catchment, accounting for accumulation from upstream, and divided by the total upstream area (km2), all normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						DINp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (nitrogen and phosphorus)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches the Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher<i/> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						GDDsP:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Growing degree days</b><br>Accumulated growing degree days for 2016-2017, normalized to a 0-100 scale. May be used in conjunction with &#x22;local nutrient loading&#x22; slider above to identify 5-year-floodplain with high loading and high growing degree days, i.e. high denitrification potential."
						}, 
						CPI:{
							values:[], vis:true, min:0, max:0.834, step:0.001,
							info:"<b>Agricultural Productivity Potential of Soils</b><br>An index characterizing soil's inherent capacity to produce non-irrigated commodity crops (0 - 1). Lower value suggests less productive soil, and therefore more viable opportunity for restoration."
						}, 
						WT_TOT:{
							values:[], vis:true, min:0, max:8, shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/ESN/Totalnumberofatriskwetlandspecies.pdf' target='_blank'>More Info</a>"
						}, 
						cumu_hci:{
							values:[], vis:true, min:0.999, max:5.001, step:0.001, shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For restoration priorities, identify catchments <i>lower</i> in this metric, i.e. with more extreme stressors. <a href='http://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
						}, 
						popnow:{
							values:[], vis:true, min:1, max:11, gtmax:true,
							info:"<b>Population Exposed to Floods (Present-Day)</b><br>People currently living in ag or pasture land that is in a floodplain of the selected flood frequency. <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						}, 
						pop2050:{
							values:[], vis:true, min:1, max:501, gtmax:true,
							info:"<b>Population exposed to floods (2050)</b><br>People expected in 2050 to be living in ag or pasture land that is in a floodplain of the selected flood frequency. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						P2_2050:{
							values:[], vis:true, min:0, max:200000, gtmax:true, 
							info:"<b>Potential Future Flood Damages to Structures (2050) ($)</b><br>Estimate of property damage in the floodplain corresponding to the selected flood frequency and management action, given flood depth and projected 2050 land use / building type. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},						
						SOVI:{
							values:[], vis:true, min:-7.051, max:8.536,  step:0.001, shfld:true,
							info:"<b>Index of Social Vulnerability to Environmental Hazards</b><br>Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. <a href='http://artsandsciences.sc.edu/geog/hvri/faq' target='_blank'>More Info</a>"
						}
					},
					// catchment + restoration + 1 in 100 year flood
					catchr2:{
						Acres:{
							values:[], vis:true, min:0, max:250, gtmax:true,
							info:"<b>Available floodplain area for given flood frequency and management action</b><br>Area of floodplain in ag or pasture land that could potentially be restored"
						}, 
						ACCp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Local Nutrient Loading (Nitrogen and Phosphorus)</b><br>Kg/yr of nitrogen and phosphorus exported at the mouth of the catchment, accounting for accumulation from upstream, and divided by the total upstream area (km2), all normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						DINp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (nitrogen and phosphorus)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches the Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher<i/> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						GDDsP:{
							vis:false
						}, 
						CPI:{
							values:[],vis:true,min:0,max:0.838,step:0.001,
							info:"<b>Agricultural Productivity Potential of Soils</b><br>An index characterizing soil's inherent capacity to produce non-irrigated commodity crops (0 - 1). Lower value suggests less productive soil, and therefore more viable opportunity for restoration."
						}, 
						WT_TOT:{
							values:[],vis:true,min:0,max:8,shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/ESN/Totalnumberofatriskwetlandspecies.pdf' target='_blank'>More Info</a>"
						}, 
						cumu_hci:{
							values:[], vis:true, min:0.999, max:5.001, step:0.001, shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For restoration priorities, identify catchments <i>lower</i> in this metric, i.e. with more extreme stressors. <a href='http://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
						}, 
						popnow:{
							values:[], vis:true, min:1, max:11, gtmax:true,
							info:"<b>Population Exposed to Floods (Present-Day)</b><br>People currently living in ag or pasture land that is in a floodplain of the selected flood frequency. <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						}, 
						pop2050:{
							values:[], vis:true, min:1, max:501, gtmax:true,
							info:"<b>Population exposed to floods (2050)</b><br>People expected in 2050 to be living in ag or pasture land that is in a floodplain of the selected flood frequency. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						P2_2050:{
							values:[], vis:true, min:0, max:1000000, gtmax:true, 
							info:"<b>Potential Future Flood Damages to Structures (2050) ($)</b><br>Estimate of property damage in the floodplain corresponding to the selected flood frequency and management action, given flood depth and projected 2050 land use / building type. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						SOVI:{
							values:[], vis:true, min:-7.051, max:8.536,  step:0.001, shfld:true,
							info:"<b>Index of Social Vulnerability to Environmental Hazards</b><br>Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. <a href='http://artsandsciences.sc.edu/geog/hvri/faq' target='_blank'>More Info</a>"
						}
					},
					// catchment + restoration + 1 in 500 year flood
					catchr3:{
						Acres:{
							values:[], vis:true, min:0, max:250, gtmax:true,
							info:"<b>Available floodplain area for given flood frequency and management action</b><br>Area of floodplain in ag or pasture land that could potentially be restored"
						}, 
						ACCp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Local Nutrient Loading (Nitrogen and Phosphorus)</b><br>Kg/yr of nitrogen and phosphorus exported at the mouth of the catchment, accounting for accumulation from upstream, and divided by the total upstream area (km2), all normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						DINp:{
							values:[], vis:true, min:0, max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (nitrogen and phosphorus)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches the Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher<i/> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						}, 
						GDDsP:{
							vis:false
						}, 
						CPI:{
							values:[], vis:true, min:0, max:0.845, step:0.001,
							info:"<b>Agricultural Productivity Potential of Soils</b><br>An index characterizing soil's inherent capacity to produce non-irrigated commodity crops (0 - 1). Lower value suggests less productive soil, and therefore more viable opportunity for restoration."
						}, 
						WT_TOT:{
							values:[], vis:true, min:0, max:8, shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/ESN/Totalnumberofatriskwetlandspecies.pdf' target='_blank'>More Info</a>"
						}, 
						cumu_hci:{
							values:[], vis:true, min:0.999, max:5.001, step:0.001, shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For restoration priorities, identify catchments <i>lower</i> in this metric, i.e. with more extreme stressors. <a href='http://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
						}, 
						popnow:{
							values:[], vis:true, min:1, max:11, gtmax:true,
							info:"<b>Population Exposed to Floods (Present-Day)</b><br>People currently living in ag or pasture land that is in a floodplain of the selected flood frequency. <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						}, 
						pop2050:{
							values:[], vis:true, min:1, max:501, gtmax:true,
							info:"<b>Population exposed to floods (2050)</b><br>People expected in 2050 to be living in ag or pasture land that is in a floodplain of the selected flood frequency. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						P2_2050:{
							values:[], vis:true, min:0, max:1000000, gtmax:true, 
							info:"<b>Potential Future Flood Damages to Structures (2050) ($)</b><br>Estimate of property damage in the floodplain corresponding to the selected flood frequency and management action, given flood depth and projected 2050 land use / building type. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},						
						SOVI:{
							values:[], vis:true, min:-7.051, max:8.536,  step:0.001, shfld:true,
							info:"<b>Index of Social Vulnerability to Environmental Hazards</b><br>Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. <a href='http://artsandsciences.sc.edu/geog/hvri/faq' target='_blank'>More Info</a>"
						}
					}
				}
				// object for radio groups
				t.radioObj = {
					h8p1:{
						inIBA:{
							vis:true,
							info:"<b>Important Bird Areas</b><br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
						}, 
						TNC:{
							vis:true,
							info:"<b>Nature Conservancy Ecoregional Assessment Units</b><br>All features identified in ecoregional assessments across the Nature Conservancy as places of biodiversity significance and priority areas for conservation action."
						}, 
						FWScrit:{
							vis:true,shfld:true,
							info:"<b>USFWS Threatened & Endangered Species Active Critical Habitat</b><br>Areas containing the physical or biological features essential to the conservation of species listed as threatened or endangered under the Endangered Species Act. <a href='https://catalog.data.gov/dataset/fws-critical-habitat-for-threatened-and-endangered-species-dataset' target='_blank'>More Info</a>"
						}, 
						ABCcorr:{
							vis:true,shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>This layer represents key bird migration corridors and habitat for birds on the Red WatchList. <a href='https://www.sciencebase.gov/catalog/item/58497c09e4b06d80b7b09483' target='_blank'>More Info</a>"
						} 
					},
					h8p2:{
						inIBA:{
							vis:true,
							info:"<b>Important Bird Areas</b><br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
						}, 
						TNC:{
							vis:true,
							info:"<b>Nature Conservancy Ecoregional Assessment Units</b><br>All features identified in ecoregional assessments across the Nature Conservancy as places of biodiversity significance and priority areas for conservation action."
						}, 
						FWScrit:{
							vis:true,shfld:true,
							info:"<b>USFWS Threatened & Endangered Species Active Critical Habitat</b><br>Areas containing the physical or biological features essential to the conservation of species listed as threatened or endangered under the Endangered Species Act. <a href='https://catalog.data.gov/dataset/fws-critical-habitat-for-threatened-and-endangered-species-dataset' target='_blank'>More Info</a>"
						}, 
						ABCcorr:{
							vis:true,shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>This layer represents key bird migration corridors and habitat for birds on the Red WatchList. <a href='https://www.sciencebase.gov/catalog/item/58497c09e4b06d80b7b09483' target='_blank'>More Info</a>"
						}
					},
					h8p3:{
						inIBA:{
							vis:true,
							info:"<b>Important Bird Areas</b><br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
						}, 
						TNC:{
							vis:true,
							info:"<b>Nature Conservancy Ecoregional Assessment Units</b><br>All features identified in ecoregional assessments across the Nature Conservancy as places of biodiversity significance and priority areas for conservation action."
						}, 
						FWScrit:{
							vis:true,shfld:true,
							info:"<b>USFWS Threatened & Endangered Species Active Critical Habitat</b><br>Areas containing the physical or biological features essential to the conservation of species listed as threatened or endangered under the Endangered Species Act. <a href='https://catalog.data.gov/dataset/fws-critical-habitat-for-threatened-and-endangered-species-dataset' target='_blank'>More Info</a>"
						}, 
						ABCcorr:{
							vis:true,shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>This layer represents key bird migration corridors and habitat for birds on the Red WatchList. <a href='https://www.sciencebase.gov/catalog/item/58497c09e4b06d80b7b09483' target='_blank'>More Info</a>"
						}
					},
					h8r1:{
						inIBA:{
							vis:true,
							info:"<b>Important Bird Areas</b><br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
						}, 
						TNC:{
							vis:true,
							info:"<b>Nature Conservancy Ecoregional Assessment Units</b><br>All features identified in ecoregional assessments across the Nature Conservancy as places of biodiversity significance and priority areas for conservation action."
						}, 
						FWScrit:{
							vis:true,shfld:true,
							info:"<b>USFWS Threatened & Endangered Species Active Critical Habitat</b><br>Areas containing the physical or biological features essential to the conservation of species listed as threatened or endangered under the Endangered Species Act. <a href='https://catalog.data.gov/dataset/fws-critical-habitat-for-threatened-and-endangered-species-dataset' target='_blank'>More Info</a>"
						}, 
						ABCcorr:{
							vis:true,shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>This layer represents key bird migration corridors and habitat for birds on the Red WatchList. <a href='https://www.sciencebase.gov/catalog/item/58497c09e4b06d80b7b09483' target='_blank'>More Info</a>"
						}
					},
					h8r2:{
						inIBA:{
							vis:true,
							info:"<b>Important Bird Areas</b><br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
						}, 
						TNC:{
							vis:true,
							info:"<b>Nature Conservancy Ecoregional Assessment Units</b><br>All features identified in ecoregional assessments across the Nature Conservancy as places of biodiversity significance and priority areas for conservation action."
						}, 
						FWScrit:{
							vis:true,shfld:true,
							info:"<b>USFWS Threatened & Endangered Species Active Critical Habitat</b><br>Areas containing the physical or biological features essential to the conservation of species listed as threatened or endangered under the Endangered Species Act. <a href='https://catalog.data.gov/dataset/fws-critical-habitat-for-threatened-and-endangered-species-dataset' target='_blank'>More Info</a>"
						}, 
						ABCcorr:{
							vis:true,shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>This layer represents key bird migration corridors and habitat for birds on the Red WatchList. <a href='https://www.sciencebase.gov/catalog/item/58497c09e4b06d80b7b09483' target='_blank'>More Info</a>"
						}
					},
					h8r3:{
						inIBA:{
							vis:true,
							info:"<b>Important Bird Areas</b><br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
						}, 
						TNC:{
							vis:true,
							info:"<b>Nature Conservancy Ecoregional Assessment Units</b><br>All features identified in ecoregional assessments across the Nature Conservancy as places of biodiversity significance and priority areas for conservation action."
						}, 
						FWScrit:{
							vis:true,shfld:true,
							info:"<b>USFWS Threatened & Endangered Species Active Critical Habitat</b><br>Areas containing the physical or biological features essential to the conservation of species listed as threatened or endangered under the Endangered Species Act. <a href='https://catalog.data.gov/dataset/fws-critical-habitat-for-threatened-and-endangered-species-dataset' target='_blank'>More Info</a>"
						}, 
						ABCcorr:{
							vis:true,shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>This layer represents key bird migration corridors and habitat for birds on the Red WatchList. <a href='https://www.sciencebase.gov/catalog/item/58497c09e4b06d80b7b09483' target='_blank'>More Info</a>"
						}
					},
					h12p1:{
						inIBA:{
							vis:true,
							info:"<b>Important Bird Areas</b><br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
						}, 
						TNC:{
							vis:true,
							info:"<b>Nature Conservancy Ecoregional Assessment Units</b><br>All features identified in ecoregional assessments across the Nature Conservancy as places of biodiversity significance and priority areas for conservation action."
						}, 
						FWScrit:{
							vis:true,shfld:true,
							info:"<b>USFWS Threatened & Endangered Species Active Critical Habitat</b><br>Areas containing the physical or biological features essential to the conservation of species listed as threatened or endangered under the Endangered Species Act. <a href='https://catalog.data.gov/dataset/fws-critical-habitat-for-threatened-and-endangered-species-dataset' target='_blank'>More Info</a>"
						}, 
						ABCcorr:{
							vis:true,shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>This layer represents key bird migration corridors and habitat for birds on the Red WatchList. <a href='https://www.sciencebase.gov/catalog/item/58497c09e4b06d80b7b09483' target='_blank'>More Info</a>"
						}
					},
					h12p2:{
						inIBA:{
							vis:true,
							info:"<b>Important Bird Areas</b><br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
						}, 
						TNC:{
							vis:true,
							info:"<b>Nature Conservancy Ecoregional Assessment Units</b><br>All features identified in ecoregional assessments across the Nature Conservancy as places of biodiversity significance and priority areas for conservation action."
						}, 
						FWScrit:{
							vis:true,shfld:true,
							info:"<b>USFWS Threatened & Endangered Species Active Critical Habitat</b><br>Areas containing the physical or biological features essential to the conservation of species listed as threatened or endangered under the Endangered Species Act. <a href='https://catalog.data.gov/dataset/fws-critical-habitat-for-threatened-and-endangered-species-dataset' target='_blank'>More Info</a>"
						}, 
						ABCcorr:{
							vis:true,shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>This layer represents key bird migration corridors and habitat for birds on the Red WatchList. <a href='https://www.sciencebase.gov/catalog/item/58497c09e4b06d80b7b09483' target='_blank'>More Info</a>"
						}
					},
					h12p3:{
						inIBA:{
							vis:true,
							info:"<b>Important Bird Areas</b><br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
						}, 
						TNC:{
							vis:true,
							info:"<b>Nature Conservancy Ecoregional Assessment Units</b><br>All features identified in ecoregional assessments across the Nature Conservancy as places of biodiversity significance and priority areas for conservation action."
						}, 
						FWScrit:{
							vis:true,shfld:true,
							info:"<b>USFWS Threatened & Endangered Species Active Critical Habitat</b><br>Areas containing the physical or biological features essential to the conservation of species listed as threatened or endangered under the Endangered Species Act. <a href='https://catalog.data.gov/dataset/fws-critical-habitat-for-threatened-and-endangered-species-dataset' target='_blank'>More Info</a>"
						}, 
						ABCcorr:{
							vis:true,shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>This layer represents key bird migration corridors and habitat for birds on the Red WatchList. <a href='https://www.sciencebase.gov/catalog/item/58497c09e4b06d80b7b09483' target='_blank'>More Info</a>"
						}	
					},
					h12r1:{
						inIBA:{
							vis:true,
							info:"<b>Important Bird Areas</b><br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
						}, 
						TNC:{
							vis:true,
							info:"<b>Nature Conservancy Ecoregional Assessment Units</b><br>All features identified in ecoregional assessments across the Nature Conservancy as places of biodiversity significance and priority areas for conservation action."
						}, 
						FWScrit:{
							vis:true,shfld:true,
							info:"<b>USFWS Threatened & Endangered Species Active Critical Habitat</b><br>Areas containing the physical or biological features essential to the conservation of species listed as threatened or endangered under the Endangered Species Act. <a href='https://catalog.data.gov/dataset/fws-critical-habitat-for-threatened-and-endangered-species-dataset' target='_blank'>More Info</a>"
						}, 
						ABCcorr:{
							vis:true,shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>This layer represents key bird migration corridors and habitat for birds on the Red WatchList. <a href='https://www.sciencebase.gov/catalog/item/58497c09e4b06d80b7b09483' target='_blank'>More Info</a>"
						}
					},
					h12r2:{
						inIBA:{
							vis:true,
							info:"<b>Important Bird Areas</b><br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
						}, 
						TNC:{
							vis:true,
							info:"<b>Nature Conservancy Ecoregional Assessment Units</b><br>All features identified in ecoregional assessments across the Nature Conservancy as places of biodiversity significance and priority areas for conservation action."
						}, 
						FWScrit:{
							vis:true,shfld:true,
							info:"<b>USFWS Threatened & Endangered Species Active Critical Habitat</b><br>Areas containing the physical or biological features essential to the conservation of species listed as threatened or endangered under the Endangered Species Act. <a href='https://catalog.data.gov/dataset/fws-critical-habitat-for-threatened-and-endangered-species-dataset' target='_blank'>More Info</a>"
						}, 
						ABCcorr:{
							vis:true,shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>This layer represents key bird migration corridors and habitat for birds on the Red WatchList. <a href='https://www.sciencebase.gov/catalog/item/58497c09e4b06d80b7b09483' target='_blank'>More Info</a>"
						}
					},
					h12r3:{
						inIBA:{
							vis:true,
							info:"<b>Important Bird Areas</b><br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
						}, 
						TNC:{
							vis:true,
							info:"<b>Nature Conservancy Ecoregional Assessment Units</b><br>All features identified in ecoregional assessments across the Nature Conservancy as places of biodiversity significance and priority areas for conservation action."
						}, 
						FWScrit:{
							vis:true,shfld:true,
							info:"<b>USFWS Threatened & Endangered Species Active Critical Habitat</b><br>Areas containing the physical or biological features essential to the conservation of species listed as threatened or endangered under the Endangered Species Act. <a href='https://catalog.data.gov/dataset/fws-critical-habitat-for-threatened-and-endangered-species-dataset' target='_blank'>More Info</a>"
						}, 
						ABCcorr:{
							vis:true,shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>This layer represents key bird migration corridors and habitat for birds on the Red WatchList. <a href='https://www.sciencebase.gov/catalog/item/58497c09e4b06d80b7b09483' target='_blank'>More Info</a>"
						}
					},
					catchp1:{
						inIBA:{
							vis:true,
							info:"<b>Important Bird Areas</b><br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
						}, 
						TNC:{
							vis:true,
							info:"<b>Nature Conservancy Ecoregional Assessment Units</b><br>All features identified in ecoregional assessments across the Nature Conservancy as places of biodiversity significance and priority areas for conservation action."
						}, 
						FWScrit:{
							vis:true,shfld:true,
							info:"<b>USFWS Threatened & Endangered Species Active Critical Habitat</b><br>Areas containing the physical or biological features essential to the conservation of species listed as threatened or endangered under the Endangered Species Act. <a href='https://catalog.data.gov/dataset/fws-critical-habitat-for-threatened-and-endangered-species-dataset' target='_blank'>More Info</a>"
						}, 
						ABCcorr:{
							vis:true,shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>This layer represents key bird migration corridors and habitat for birds on the Red WatchList. <a href='https://www.sciencebase.gov/catalog/item/58497c09e4b06d80b7b09483' target='_blank'>More Info</a>"
						}
					},
					catchp2:{
						inIBA:{
							vis:true,
							info:"<b>Important Bird Areas</b><br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
						}, 
						TNC:{
							vis:true,
							info:"<b>Nature Conservancy Ecoregional Assessment Units</b><br>All features identified in ecoregional assessments across the Nature Conservancy as places of biodiversity significance and priority areas for conservation action."
						}, 
						FWScrit:{
							vis:true,shfld:true,
							info:"<b>USFWS Threatened & Endangered Species Active Critical Habitat</b><br>Areas containing the physical or biological features essential to the conservation of species listed as threatened or endangered under the Endangered Species Act. <a href='https://catalog.data.gov/dataset/fws-critical-habitat-for-threatened-and-endangered-species-dataset' target='_blank'>More Info</a>"
						}, 
						ABCcorr:{
							vis:true,shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>This layer represents key bird migration corridors and habitat for birds on the Red WatchList. <a href='https://www.sciencebase.gov/catalog/item/58497c09e4b06d80b7b09483' target='_blank'>More Info</a>"
						}
					},
					catchp3:{
						inIBA:{
							vis:true,
							info:"<b>Important Bird Areas</b><br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
						}, 
						TNC:{
							vis:true,
							info:"<b>Nature Conservancy Ecoregional Assessment Units</b><br>All features identified in ecoregional assessments across the Nature Conservancy as places of biodiversity significance and priority areas for conservation action."
						}, 
						FWScrit:{
							vis:true,shfld:true,
							info:"<b>USFWS Threatened & Endangered Species Active Critical Habitat</b><br>Areas containing the physical or biological features essential to the conservation of species listed as threatened or endangered under the Endangered Species Act. <a href='https://catalog.data.gov/dataset/fws-critical-habitat-for-threatened-and-endangered-species-dataset' target='_blank'>More Info</a>"
						}, 
						ABCcorr:{
							vis:true,shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>This layer represents key bird migration corridors and habitat for birds on the Red WatchList. <a href='https://www.sciencebase.gov/catalog/item/58497c09e4b06d80b7b09483' target='_blank'>More Info</a>"
						}
					},
					catchr1:{
						inIBA:{
							vis:true,
							info:"<b>Important Bird Areas</b><br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
						}, 
						TNC:{
							vis:true,
							info:"<b>Nature Conservancy Ecoregional Assessment Units</b><br>All features identified in ecoregional assessments across the Nature Conservancy as places of biodiversity significance and priority areas for conservation action."
						}, 
						FWScrit:{
							vis:true,shfld:true,
							info:"<b>USFWS Threatened & Endangered Species Active Critical Habitat</b><br>Areas containing the physical or biological features essential to the conservation of species listed as threatened or endangered under the Endangered Species Act. <a href='https://catalog.data.gov/dataset/fws-critical-habitat-for-threatened-and-endangered-species-dataset' target='_blank'>More Info</a>"
						}, 
						ABCcorr:{
							vis:true,shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>This layer represents key bird migration corridors and habitat for birds on the Red WatchList. <a href='https://www.sciencebase.gov/catalog/item/58497c09e4b06d80b7b09483' target='_blank'>More Info</a>"
						}
					},
					catchr2:{
						inIBA:{
							vis:true,
							info:"<b>Important Bird Areas</b><br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
						}, 
						TNC:{
							vis:true,
							info:"<b>Nature Conservancy Ecoregional Assessment Units</b><br>All features identified in ecoregional assessments across the Nature Conservancy as places of biodiversity significance and priority areas for conservation action."
						}, 
						FWScrit:{
							vis:true,shfld:true,
							info:"<b>USFWS Threatened & Endangered Species Active Critical Habitat</b><br>Areas containing the physical or biological features essential to the conservation of species listed as threatened or endangered under the Endangered Species Act. <a href='https://catalog.data.gov/dataset/fws-critical-habitat-for-threatened-and-endangered-species-dataset' target='_blank'>More Info</a>"
						}, 
						ABCcorr:{
							vis:true,shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>This layer represents key bird migration corridors and habitat for birds on the Red WatchList. <a href='https://www.sciencebase.gov/catalog/item/58497c09e4b06d80b7b09483' target='_blank'>More Info</a>"
						}
					},
					catchr3:{
						inIBA:{
							vis:true,
							info:"<b>Important Bird Areas</b><br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
						}, 
						TNC:{
							vis:true,
							info:"<b>Nature Conservancy Ecoregional Assessment Units</b><br>All features identified in ecoregional assessments across the Nature Conservancy as places of biodiversity significance and priority areas for conservation action."
						}, 
						FWScrit:{
							vis:true,shfld:true,
							info:"<b>USFWS Threatened & Endangered Species Active Critical Habitat</b><br>Areas containing the physical or biological features essential to the conservation of species listed as threatened or endangered under the Endangered Species Act. <a href='https://catalog.data.gov/dataset/fws-critical-habitat-for-threatened-and-endangered-species-dataset' target='_blank'>More Info</a>"
						}, 
						ABCcorr:{
							vis:true,shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>This layer represents key bird migration corridors and habitat for birds on the Red WatchList. <a href='https://www.sciencebase.gov/catalog/item/58497c09e4b06d80b7b09483' target='_blank'>More Info</a>"
						}
					}
				}
			},
			modifications: function(t){
				// Wrap header with div
				$(`h4:contains("View Floodplains By Watershed")`).wrap('<div id="' + t.id + 'fp-wrap" style="position:relative;"/>')
				// Add zoom to activate text above Catchments
				$(`#${t.id}fp-wrap`).prepend(`
					<div id="${t.id}catch-text" class="catch-text">Zoom in to Activate</div>
				`)
				// Disable catchment button and show zoom in text
				if (t.obj.stateSet == "no"){
					$("#" + t.id + "-catch").prop("disabled", true)
					$(`#${t.id}catch-text`).show();
				}
				// Enable or disable button and show or hide text based on map scale
				t.map.on("zoom-end",function(z){
					if ( t.map.getScale() > 144448){
						$("#" + t.id + "-catch").prop("disabled", true)
						$(`#${t.id}catch-text`).show();
					}else{
						$("#" + t.id + "-catch").prop("disabled", false)
						$(`#${t.id}catch-text`).hide();
					}
				})
			}
		});
    }
);