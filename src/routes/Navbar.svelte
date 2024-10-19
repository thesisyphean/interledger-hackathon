<script>
  export let communities;
</script>

<div class="navbar bg-base-100 h-16">
  <div class="navbar-start">
    <a href="/" class="btn btn-ghost text-xl">Microlending</a>
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      {#if communities}
      {#each communities as community}
      <li><a href="/">{community}</a></li>
      {/each}
      {/if}
    </ul>
  </div>
  <div class="navbar-end">
    <button class="btn">Log Out</button>
  </div>
</div>