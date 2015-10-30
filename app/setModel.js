/**
 * Created by sarin on 10/27/15.
 */
module.exports = function(key_array,property_array,provider_data){
    final_value = {};
    for (var key=0; key < key_array.length; key++)
    {

        var split_array = key_array[key].split('.');
        try {
            var obj_value = provider_data[split_array[0]];
            console.log(obj_value);
            for (var split = 1; split < split_array.length; split++) {
                obj_value = obj_value[split_array[split]];
            }
            final_value[property_array[key]] = obj_value;
        } catch(err){
            continue
        }
    }
    return final_value;
};