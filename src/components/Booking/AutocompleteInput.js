import PlacesAutocomplete from "react-places-autocomplete";
export default function AutocompleteInput(props){
   return( <PlacesAutocomplete
                value={props.value}
                onChange={props.onChange}
                onSelect={props.onSelect}
                searchOptions={{ componentRestrictions: { country: "gb" } }}>
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div>
                    <input
                     
                      {...getInputProps({
                        id: "location",
                        className:
                          " w-auto  flex grow border-0 rounded-md flex-1 appearance-none focus-ring-full py-2 px-4 bg-gray-50 text-gray-700 placeholder-gray-500 shadow-sm text-base focus:outline-none ring-2 focus:ring-2 focus:ring-sky-600",
                        name:props.name,
                        type: "text",
                        required: true,
                        placeholder: props.placeholder,
                      })}
                    />

                    <div className="absolute bg-gray-50 z-[999] ">
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion) => {
                        let className = suggestion.active
                          ? "bg-gray-200 py-2 px-4 max-xs"
                          : "bg-gray-50 py-2 px-4 max-xs";
                        // inline style for demonstration purpose
                        let style = suggestion.active
                          ? {
                              backgroundColor: "rgb(229 231 235)",
                              cursor: "pointer",
                            }
                          : {
                              backgroundColor: "rgb(249 250 251)",
                              cursor: "pointer",
                            };
                        let key = suggestion.value;
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                              key,
                            })}>
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>)
}