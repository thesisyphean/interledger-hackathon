<script lang="ts">
  import Navbar from "../../Navbar.svelte";
  import LoanCard from "../../LoanCard.svelte";
  import ProgressBar from "../../ProgressBar.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  const amountFunded = data.loans.reduce((acc, loan) => acc + loan.totalAmount, 0);

  let payModal: HTMLDialogElement;
  let donateModal: HTMLDialogElement;
  let lendModal: HTMLDialogElement;
</script>

<Navbar communities={[]} />
<div class="min-h-screen space-y-10 bg-base-200 p-10">
  <div class="flex flex-row items-center space-x-10">
    <div class="flex space-x-10">
      <div class="flex flex-col">
        <h1 class="whitespace-nowrap text-3xl">{data.campaignName}</h1>
        {#if data.isOwner}
          <p class="whitespace-nowrap text-xl">{data.description?.slice(0, 35)}...</p>
        {:else}
          <p class="whitespace-nowrap text-xl">{data.ownerName}</p>
        {/if}
      </div>
      <div class="flex flex-col">
        <p class="whitespace-nowrap text-xl">Total: {data.requiredAmount}</p>
        <p class="whitespace-nowrap text-xl">Received: {amountFunded}</p>
      </div>
    </div>
    <ProgressBar percentFunded={(amountFunded / data.requiredAmount) * 100} />
  </div>
  {#if data.isOwner}
    <div class="space-y-8">
      {#each data.loans as loan}
        <LoanCard {...loan}>
          <button class="btn btn-primary" on:click={() => payModal.showModal()}>Pay Back</button>
          <dialog class="modal" bind:this={payModal}>
            <div class="modal-box">
              <form method="dialog">
                <button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
              </form>
              <h3 class="text-lg font-bold">Pay</h3>
              <form action="/campaign/{data.slug}?/pay" method="post">
                <label class="form-control w-full">
                  <div class="label">
                    <span class="label-text">How much would you like to pay?</span>
                  </div>
                  <input type="hidden" name="id" value={loan.loanId} />
                  <input
                    name="amount"
                    type="number"
                    min="1"
                    step="any"
                    placeholder="1.0"
                    class="input input-bordered w-full"
                  />
                </label>
                <button type="submit" class="btn btn-primary mt-4 w-full">Pay</button>
              </form>
            </div>
          </dialog>
        </LoanCard>
      {/each}
    </div>
  {:else}
    <div
      class="flex w-full flex-row justify-items-stretch space-x-4 rounded-xl bg-base-100 p-4 shadow-xl"
    >
      <img
        class="h-32 rounded-xl"
        src="https://c8.alamy.com/comp/2K31TN8/he-only-has-eyes-for-his-boy-a-young-man-lifting-his-son-up-into-the-air-2K31TN8.jpg"
        alt="Movie"
      />
      <p class="grow text-lg">
        {data.description}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce scelerisque
        urna lorem, id luctus massa semper sit amet. Ut id congue turpis, quis vulputate sem. Donec
        ut sapien augue. Nunc ex lectus, faucibus nec rhoncus a, dapibus et sem. Cras eu massa
        nulla. Praesent vulputate mi in diam condimentum luctus. Proin et dapibus est. In feugiat
        porta sem. Cras maximus felis tortor, at lacinia orci sodales non.
      </p>
      <div class="flex flex-col space-y-8">
        <button class="btn btn-accent" on:click={() => donateModal.showModal()}>Donate</button>
        <dialog class="modal" bind:this={donateModal}>
          <div class="modal-box">
            <form method="dialog">
              <button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
            </form>
            <h3 class="text-lg font-bold">Donate</h3>
            <form action="/campaign/{data.slug}?/donate" method="post">
              <label class="form-control w-full">
                <div class="label">
                  <span class="label-text">How much would you like to donate?</span>
                </div>
                <input
                  name="amount"
                  type="number"
                  min="1"
                  step="any"
                  placeholder="1.0"
                  class="input input-bordered w-full"
                />
              </label>
              <button type="submit" class="btn btn-accent mt-4 w-full">Donate</button>
            </form>
          </div>
        </dialog>

        <button class="btn btn-secondary" on:click={() => lendModal.showModal()}>Lend</button>
        <dialog class="modal" bind:this={lendModal}>
          <div class="modal-box">
            <form method="dialog">
              <button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
            </form>
            <h3 class="text-lg font-bold">Lend</h3>

            <form action="/campaign/{data.slug}?/lend" method="post">
              <label class="form-control w-full">
                <div class="label">
                  <span class="label-text">How much would you like to lend?</span>
                </div>
                <input
                  name="amount"
                  type="number"
                  min="1"
                  step="any"
                  placeholder="1.0"
                  class="input input-bordered w-full"
                />
              </label>
              <label class="form-control w-full">
                <div class="label">
                  <span class="label-text">What is the interest rate?</span>
                </div>
                <input
                  name="interest"
                  type="number"
                  min="1"
                  step="any"
                  placeholder="1.0"
                  class="input input-bordered w-full"
                />
              </label>
              <button type="submit" class="btn btn-secondary mt-4 w-full">Lend</button>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  {/if}
</div>
