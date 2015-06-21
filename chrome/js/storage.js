function prepareForStorage (data) {
	var dataForStorage = [];
	$(data).each(function(i, v){
		dataForStorage.push({
			id                    	 : 	i,
			link                  	 : 	v.link, 
			main_image            	 : 	v.main_image, 
			description           	 : 	v.description, 
			content_description   	 : 	v.content_description,
			facebook_value        	 : 	v.facebook_value,
			facebook_value_numbers	 : 	v.facebook_value_numbers,
			twitter_number        	 : 	v.twitter_number,
			update_date           	 : 	setTrDate(v.content_value),
			content_value         	 : 	v.content_value,
			content_value_numbers 	 : 	v.content_value_numbers,
			featured_link         	 : 	v.featured_link,
			featured_image        	 : 	v.featured_image,
			featuredstrong_value  	 : 	v.featuredstrong_value,
			featuredtext_value    	 : 	v.featuredtext_value,
			RecordDate            	 : 	new Date().toString()
		});

	});
	return dataForStorage;
}