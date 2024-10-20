<script>
  import LoanCard from "../LoanCard.svelte";
  import Navbar from "../Navbar.svelte";
  export let data;
</script>

<Navbar communities={[]} />
<div class="space-y-8 p-10">
  {#each data.loans as loan}
    <LoanCard {...loan} />
  {/each}
</div>

