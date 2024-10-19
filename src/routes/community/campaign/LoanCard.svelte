<script>
    import ProgressBar from "./ProgressBar.svelte";

  export let title = "Title";
  export let beneficiary = "Beneficiary";
  export let totalAmount = 1000;
  export let amountPaid = 500;
</script>

<div class="flex flex-row items-center card bg-base-100 w-full shadow-xl p-8">
  <div class="flex flex-row items-end space-x-4">
    <h2 class="card-title">{title}</h2>
    <p>{beneficiary}</p>
    <p>Total: {totalAmount}</p>
    <p>Paid: {amountPaid}</p>
    <!-- TODO
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
    -->
  </div>
  <!-- TODO -->
  <ProgressBar percentFunded={(amountPaid / totalAmount) * 100} />
</div>