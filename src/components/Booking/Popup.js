export default function Popup(props) {
  return (
    <div id="popup" class="p-8 bg-white rounded-lg shadow-2xl mt-40 ">
      <h2 id="popup" class="text-lg font-bold">Hey, looks like you already started a booking!</h2>

      <p id="popup" class="mt-2 text-sm text-gray-500">
        Do you want to continue where you left off?
      </p>

      <div id="popup" class="flex items-center justify-end mt-8 text-xs">
        <button 
          type="button"
          class="px-4 py-2 font-medium text-green-600 rounded bg-green-50">
          Yes, use my previous details
        </button>
        <button id="popup"
          onClick={props.onClick}
          type="button"
          class="px-4 py-2 ml-2 font-medium text-gray-600 rounded bg-gray-50">
          No, I want to start again
        </button>
      </div>
    </div>
  );
}
