<script>
    import LoanCard from "../campaign/LoanCard.svelte";
    import Navbar from "../Navbar.svelte";
    export let data;
</script>

<Navbar communities={[]} />
<div class="p-10 space-y-8">
    {#each data.loans as loan}
        <LoanCard {...loan} />
    {/each}
</div>