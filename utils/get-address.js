import Client from "getaddress-api"

async function getAddress(term){
    const api = new Client(process.env.NEXT_PUBLIC_GETADDRESS_API_KEY)
const autocompleteResult = await api.autocomplete("KW1 4YT")
if(autocompleteResult.isSuccess)
{
  var success = autocompleteResult.toSuccess();

  for(const suggestion of success.suggestions)
  {
      const address = await api.get(suggestion.id);
      console.log(address);
  }
}
else
{
  const failed = autocompleteResult.toFailed();
  console.log(failed);
}
}
export default getAddress