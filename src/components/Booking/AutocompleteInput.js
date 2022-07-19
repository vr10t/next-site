import PlacesAutocomplete from "react-places-autocomplete";

export default function AutocompleteInput(props){
   return( <PlacesAutocomplete
                value={props.value}
                onChange={props.onChange}
                onSelect={props.onSelect}
                onError={(status, clearSuggestions) => {
                  console.log(
                    "Google Maps API returned error with status: ",
                    status
                  );
                  clearSuggestions();
                }}
                
                shouldFetchSuggestions={props.shouldFetchSuggestions}
                searchOptions={{
                  componentRestrictions: { country: "gb" },
                  fields: ["formatted_address"],
                }}>
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div >
                    <input
                     
                      {...getInputProps({
                        id: props.id,
                        className:
                          " w-auto max-w-[12rem] xs:max-w-[15rem] md:max-w-[18rem] flex grow border-0 rounded-md flex-1 appearance-none focus-ring-full py-2 px-4 bg-gray-50 text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none ring-2 focus:ring-2 focus:ring-sky-600",
                        name:props.name,
                        type: "text",
                        required: true,
                        placeholder: props.placeholder,
                      })}
                    />

                    <div className="relative top-0 max-h-[10rem] bg-gray-50 z-[999] w-auto max-w-[12rem] xs:max-w-[15rem] overflow-auto ">
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? "bg-gray-200 py-2 px-4 max-xs"
                          : "bg-gray-50 py-2 px-4 max-xs";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? {
                              backgroundColor: "rgb(229 231 235)",
                              cursor: "pointer",
                            }
                          : {
                              backgroundColor: "rgb(249 250 251)",
                              cursor: "pointer",
                            };
                        const key = 1;
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                              key,
                            })}
                            key={suggestion.id}>
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>)
}