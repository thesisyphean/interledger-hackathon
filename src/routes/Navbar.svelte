<script lang="ts">
  import type { Community } from "$lib/server/database/community";
  export let communities: Community[];
</script>

<div class="navbar h-16 bg-base-100">
  <div class="navbar-start">
    <a href="/" class="btn btn-ghost text-xl">Usizo</a>
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      {#if communities}
        {#each communities as community}
          <li><a href="/{community.communityId}">{community.name}</a></li>
        {/each}
      {/if}
    </ul>
  </div>
  <div class="navbar-end">
    <a href="/loans" class="btn">Loans</a>
  </div>
</div>
