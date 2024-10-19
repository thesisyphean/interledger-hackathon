<script>
    export let imageURL;
    export let title;
    export let description;
    export let action;
    export let actionText;
</script>

<div class="card bg-base-100 w-96 shadow-xl">
  <figure class="px-10 pt-10">
    <img
      src={imageURL}
      alt={title}
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">{title}</h2>
    <p>{description}</p>
    <div class="card-actions">
      <button class="btn btn-primary" on:click={action}>{actionText}</button>
    </div>
  </div>
</div>