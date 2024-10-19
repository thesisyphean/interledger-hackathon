<script>
  export let campaigns;
</script>

<div class="navbar bg-base-100 h-16">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
    </div>
    <a class="btn btn-ghost text-xl">Microlending</a>
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      {#if campaigns}
      {#each campaigns as campaign}
      <li><a href="#">{campaign}</a></li>
      {/each}
      {/if}
    </ul>
  </div>
  <div class="navbar-end">
    <a class="btn">Button</a>
  </div>
</div>