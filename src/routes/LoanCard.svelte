<script>
  import ProgressBar from "./ProgressBar.svelte";

  export let title = "Title";
  export let beneficiary = "Beneficiary";
  export let totalAmount = 1000;
  export let amountPaid = 500;
</script>

<div class="card flex w-full flex-row items-center space-x-6 bg-base-100 p-8 shadow-xl">
  <div class="avatar placeholder">
    <div class="w-16 rounded-full bg-neutral text-neutral-content">
      <span class="text-2xl">{beneficiary[0]}</span>
    </div>
  </div>
  <h2 class="card-title">{title}</h2>
  <p>Total: {totalAmount}</p>
  <p>Paid: {amountPaid}</p>
  <ProgressBar percentFunded={(amountPaid / totalAmount) * 100} />
  <slot />
</div>
