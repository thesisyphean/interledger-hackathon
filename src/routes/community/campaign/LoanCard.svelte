<script>
    import ProgressBar from "./ProgressBar.svelte";

  export let title = "Title";
  export let description = "Description...";
</script>

<div class="flex flex-row items-center card bg-base-100 w-full shadow-xl p-8">
  <div class="flex flex-row items-end space-x-4">
    <h2 class="card-title">{title}</h2>
    <p>{description}</p>
    <!-- TODO
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
    -->
  </div>
  <ProgressBar percentFunded={50} />
</div>