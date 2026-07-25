"use strict";

/* =========================================================
   Selling Price Calculator
   Complete Version-One JavaScript
   ========================================================= */

/* ---------- Page elements ---------- */

const calculatorForm = document.getElementById("calculator-form");

const baseCostInput = document.getElementById("base-cost");
const additionalCostInput = document.getElementById("additional-cost");
const percentageFeeInput = document.getElementById("percentage-fee");
const fixedFeeInput = document.getElementById("fixed-fee");
const desiredMarginInput = document.getElementById("desired-margin");

const baseCostError = document.getElementById("base-cost-error");
const additionalCostError = document.getElementById(
  "additional-cost-error"
);
const percentageFeeError = document.getElementById(
  "percentage-fee-error"
);
const fixedFeeError = document.getElementById("fixed-fee-error");
const desiredMarginError = document.getElementById(
  "desired-margin-error"
);

const formMessage = document.getElementById("form-message");

const resultsPlaceholder = document.getElementById(
  "results-placeholder"
);
const calculatorResults = document.getElementById(
  "calculator-results"
);

const recommendedPriceOutput = document.getElementById(
  "recommended-price"
);
const totalFixedCostsOutput = document.getElementById(
  "total-fixed-costs"
);
const percentageFeeAmountOutput = document.getElementById(
  "percentage-fee-amount"
);
const totalCostsAndFeesOutput = document.getElementById(
  "total-costs-and-fees"
);
const profitPerSaleOutput = document.getElementById(
  "profit-per-sale"
);
const actualMarginOutput = document.getElementById(
  "actual-margin"
);
const equivalentMarkupOutput = document.getElementById(
  "equivalent-markup"
);
const breakEvenPriceOutput = document.getElementById(
  "break-even-price"
);
const maximumDiscountAmountOutput = document.getElementById(
  "maximum-discount-amount"
);
const maximumDiscountPercentageOutput = document.getElementById(
  "maximum-discount-percentage"
);

const loadExampleButton = document.getElementById(
  "load-example-button"
);
const resetButton = document.getElementById("reset-button");
const copyResultsButton = document.getElementById(
  "copy-results-button"
);
const copyStatus = document.getElementById("copy-status");
const currentYear = document.getElementById("current-year");

/* ---------- Formatters ---------- */

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const percentageFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

/* ---------- Calculator state ---------- */

let latestResults = null;

/* ---------- Utility functions ---------- */

function formatCurrency(value) {
  if (!Number.isFinite(value)) {
    return "$0.00";
  }

  return currencyFormatter.format(value);
}

function formatPercentage(value) {
  if (!Number.isFinite(value)) {
    return "0.00%";
  }

  return `${percentageFormatter.format(value)}%`;
}

function parseInputValue(input, blankValue = 0) {
  const rawValue = input.value.trim();

  if (rawValue === "") {
    return blankValue;
  }

  const parsedValue = Number(rawValue);

  if (!Number.isFinite(parsedValue)) {
    return null;
  }

  return parsedValue;
}

function getInputWrapper(input) {
  return input.closest(".input-wrapper");
}

function showFieldError(input, errorElement, message) {
  errorElement.textContent = message;
  input.setAttribute("aria-invalid", "true");

  const wrapper = getInputWrapper(input);

  if (wrapper) {
    wrapper.classList.add("has-error");
  }
}

function clearFieldError(input, errorElement) {
  errorElement.textContent = "";
  input.removeAttribute("aria-invalid");

  const wrapper = getInputWrapper(input);

  if (wrapper) {
    wrapper.classList.remove("has-error");
  }
}

function clearAllFieldErrors() {
  clearFieldError(baseCostInput, baseCostError);
  clearFieldError(additionalCostInput, additionalCostError);
  clearFieldError(percentageFeeInput, percentageFeeError);
  clearFieldError(fixedFeeInput, fixedFeeError);
  clearFieldError(desiredMarginInput, desiredMarginError);
}

function showFormMessage(message, type = "error") {
  formMessage.textContent = message;
  formMessage.hidden = false;
  formMessage.classList.toggle("is-warning", type === "warning");
}

function clearFormMessage() {
  formMessage.textContent = "";
  formMessage.hidden = true;
  formMessage.classList.remove("is-warning");
}

function showResults() {
  resultsPlaceholder.hidden = true;
  calculatorResults.hidden = false;
}

function hideResults() {
  resultsPlaceholder.hidden = false;
  calculatorResults.hidden = true;
  latestResults = null;
}

function clearCopyStatus() {
  copyStatus.textContent = "";
}

/* ---------- Validation ---------- */

function validateInputs() {
  clearAllFieldErrors();
  clearFormMessage();

  let isValid = true;

  const baseCost = parseInputValue(baseCostInput, null);
  const additionalCost = parseInputValue(additionalCostInput, 0);
  const percentageFee = parseInputValue(percentageFeeInput, 0);
  const fixedFee = parseInputValue(fixedFeeInput, 0);
  const desiredMargin = parseInputValue(desiredMarginInput, null);

  if (baseCost === null) {
    if (baseCostInput.value.trim() !== "") {
      showFieldError(
        baseCostInput,
        baseCostError,
        "Enter a valid base cost."
      );
      isValid = false;
    }
  } else if (baseCost < 0) {
    showFieldError(
      baseCostInput,
      baseCostError,
      "Base cost cannot be negative."
    );
    isValid = false;
  }

  if (additionalCost === null) {
    showFieldError(
      additionalCostInput,
      additionalCostError,
      "Enter a valid additional cost."
    );
    isValid = false;
  } else if (additionalCost < 0) {
    showFieldError(
      additionalCostInput,
      additionalCostError,
      "Additional cost cannot be negative."
    );
    isValid = false;
  }

  if (percentageFee === null) {
    showFieldError(
      percentageFeeInput,
      percentageFeeError,
      "Enter a valid percentage fee."
    );
    isValid = false;
  } else if (percentageFee < 0) {
    showFieldError(
      percentageFeeInput,
      percentageFeeError,
      "Percentage fee cannot be negative."
    );
    isValid = false;
  } else if (percentageFee >= 100) {
    showFieldError(
      percentageFeeInput,
      percentageFeeError,
      "Percentage fee must be less than 100%."
    );
    isValid = false;
  }

  if (fixedFee === null) {
    showFieldError(
      fixedFeeInput,
      fixedFeeError,
      "Enter a valid fixed fee."
    );
    isValid = false;
  } else if (fixedFee < 0) {
    showFieldError(
      fixedFeeInput,
      fixedFeeError,
      "Fixed fee cannot be negative."
    );
    isValid = false;
  }

  if (desiredMargin === null) {
    if (desiredMarginInput.value.trim() !== "") {
      showFieldError(
        desiredMarginInput,
        desiredMarginError,
        "Enter a valid desired profit margin."
      );
      isValid = false;
    }
  } else if (desiredMargin < 0) {
    showFieldError(
      desiredMarginInput,
      desiredMarginError,
      "Desired profit margin cannot be negative."
    );
    isValid = false;
  } else if (desiredMargin >= 100) {
    showFieldError(
      desiredMarginInput,
      desiredMarginError,
      "Desired profit margin must be less than 100%."
    );
    isValid = false;
  }

  if (!isValid) {
    showFormMessage(
      "Please correct the highlighted field or fields."
    );

    return {
      isValid: false,
      isComplete: false
    };
  }

  const isComplete =
    baseCost !== null &&
    desiredMargin !== null;

  if (!isComplete) {
    return {
      isValid: true,
      isComplete: false
    };
  }

  const feeRate = percentageFee / 100;
  const marginRate = desiredMargin / 100;

  if (feeRate + marginRate >= 1) {
    showFormMessage(
      "Your percentage fee and desired profit margin total " +
        "100% or more. Reduce one of them so part of the " +
        "selling price remains available to cover your costs."
    );

    return {
      isValid: false,
      isComplete: true
    };
  }

  return {
    isValid: true,
    isComplete: true,
    values: {
      baseCost,
      additionalCost,
      percentageFee,
      fixedFee,
      desiredMargin,
      feeRate,
      marginRate
    }
  };
}

/* ---------- Calculations ---------- */

function calculatePricing(values) {
  const {
    baseCost,
    additionalCost,
    percentageFee,
    fixedFee,
    desiredMargin,
    feeRate,
    marginRate
  } = values;

  const totalFixedCosts =
    baseCost +
    additionalCost +
    fixedFee;

  const recommendedPrice =
    totalFixedCosts /
    (1 - feeRate - marginRate);

  const percentageFeeAmount =
    recommendedPrice *
    feeRate;

  const totalCostsAndFees =
    totalFixedCosts +
    percentageFeeAmount;

  const profitPerSale =
    recommendedPrice -
    totalCostsAndFees;

  const actualMarginRate =
    recommendedPrice === 0
      ? 0
      : profitPerSale / recommendedPrice;

  const equivalentMarkupRate =
    totalCostsAndFees === 0
      ? 0
      : profitPerSale / totalCostsAndFees;

  const breakEvenPrice =
    totalFixedCosts /
    (1 - feeRate);

  const maximumDiscountAmount =
    Math.max(
      0,
      recommendedPrice - breakEvenPrice
    );

  const maximumDiscountRate =
    recommendedPrice === 0
      ? 0
      : maximumDiscountAmount / recommendedPrice;

  const results = {
    baseCost,
    additionalCost,
    percentageFee,
    fixedFee,
    desiredMargin,
    totalFixedCosts,
    recommendedPrice,
    percentageFeeAmount,
    totalCostsAndFees,
    profitPerSale,
    actualMarginRate,
    equivalentMarkupRate,
    breakEvenPrice,
    maximumDiscountAmount,
    maximumDiscountRate
  };

  const allResultsAreFinite = Object.values(results).every(
    (value) => Number.isFinite(value)
  );

  if (!allResultsAreFinite) {
    return null;
  }

  return results;
}

/* ---------- Display results ---------- */

function displayResults(results) {
  latestResults = results;

  recommendedPriceOutput.textContent = formatCurrency(
    results.recommendedPrice
  );

  totalFixedCostsOutput.textContent = formatCurrency(
    results.totalFixedCosts
  );

  percentageFeeAmountOutput.textContent = formatCurrency(
    results.percentageFeeAmount
  );

  totalCostsAndFeesOutput.textContent = formatCurrency(
    results.totalCostsAndFees
  );

  profitPerSaleOutput.textContent = formatCurrency(
    results.profitPerSale
  );

  actualMarginOutput.textContent = formatPercentage(
    results.actualMarginRate * 100
  );

  equivalentMarkupOutput.textContent = formatPercentage(
    results.equivalentMarkupRate * 100
  );

  breakEvenPriceOutput.textContent = formatCurrency(
    results.breakEvenPrice
  );

  maximumDiscountAmountOutput.textContent = formatCurrency(
    results.maximumDiscountAmount
  );

  maximumDiscountPercentageOutput.textContent =
    `${formatPercentage(
      results.maximumDiscountRate * 100
    )} of the recommended price`;

  showResults();
}

/* ---------- Main update function ---------- */

function updateCalculator() {
  clearCopyStatus();

  const validation = validateInputs();

  if (!validation.isComplete) {
    hideResults();
    return;
  }

  if (!validation.isValid) {
    hideResults();
    return;
  }

  const results = calculatePricing(validation.values);

  if (!results) {
    hideResults();

    showFormMessage(
      "The calculator could not produce a valid result. " +
        "Review the entered values and try again."
    );

    return;
  }

  displayResults(results);
}

/* ---------- Example values ---------- */

function loadExample() {
  baseCostInput.value = "50.00";
  additionalCostInput.value = "0.00";
  percentageFeeInput.value = "10";
  fixedFeeInput.value = "0.00";
  desiredMarginInput.value = "20";

  updateCalculator();

  baseCostInput.focus();
}

/* ---------- Reset ---------- */

function resetCalculator() {
  window.setTimeout(() => {
    clearAllFieldErrors();
    clearFormMessage();
    clearCopyStatus();
    hideResults();

    baseCostInput.focus();
  }, 0);
}

/* ---------- Copy results ---------- */

function createResultsText(results) {
  return [
    "KESMO Pricing Calculator Results",
    "",
    `Base cost: ${formatCurrency(results.baseCost)}`,
    `Additional cost per sale: ${formatCurrency(
      results.additionalCost
    )}`,
    `Percentage-based fee: ${formatPercentage(
      results.percentageFee
    )}`,
    `Fixed fee per transaction: ${formatCurrency(
      results.fixedFee
    )}`,
    `Desired profit margin: ${formatPercentage(
      results.desiredMargin
    )}`,
    "",
    `Recommended selling price: ${formatCurrency(
      results.recommendedPrice
    )}`,
    `Total fixed costs: ${formatCurrency(
      results.totalFixedCosts
    )}`,
    `Percentage-based fees: ${formatCurrency(
      results.percentageFeeAmount
    )}`,
    `Total costs and fees: ${formatCurrency(
      results.totalCostsAndFees
    )}`,
    `Profit per sale: ${formatCurrency(
      results.profitPerSale
    )}`,
    `Actual profit margin: ${formatPercentage(
      results.actualMarginRate * 100
    )}`,
    `Equivalent markup: ${formatPercentage(
      results.equivalentMarkupRate * 100
    )}`,
    `Break-even selling price: ${formatCurrency(
      results.breakEvenPrice
    )}`,
    `Maximum discount before losing money: ${formatCurrency(
      results.maximumDiscountAmount
    )} (${formatPercentage(
      results.maximumDiscountRate * 100
    )})`,
    "",
    "Results are estimates rounded for display."
  ].join("\n");
}

async function copyResults() {
  if (!latestResults) {
    copyStatus.textContent =
      "Enter valid values before copying results.";
    return;
  }

  const resultsText = createResultsText(latestResults);

  try {
    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {
      await navigator.clipboard.writeText(resultsText);
    } else {
      copyTextWithFallback(resultsText);
    }

    copyStatus.textContent =
      "Results copied to your clipboard.";
  } catch (error) {
    const fallbackSucceeded =
      copyTextWithFallback(resultsText);

    copyStatus.textContent = fallbackSucceeded
      ? "Results copied to your clipboard."
      : "Copying failed. Please select and copy the results manually.";
  }
}

function copyTextWithFallback(text) {
  const textArea = document.createElement("textarea");

  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.top = "-9999px";
  textArea.style.left = "-9999px";

  document.body.appendChild(textArea);

  textArea.focus();
  textArea.select();

  let copied = false;

  try {
    copied = document.execCommand("copy");
  } catch (error) {
    copied = false;
  }

  document.body.removeChild(textArea);

  return copied;
}

/* ---------- Event listeners ---------- */

const calculatorInputs = [
  baseCostInput,
  additionalCostInput,
  percentageFeeInput,
  fixedFeeInput,
  desiredMarginInput
];

calculatorInputs.forEach((input) => {
  input.addEventListener("input", updateCalculator);
  input.addEventListener("change", updateCalculator);
});

calculatorForm.addEventListener("submit", (event) => {
  event.preventDefault();
  updateCalculator();
});

calculatorForm.addEventListener("reset", resetCalculator);

loadExampleButton.addEventListener("click", loadExample);
resetButton.addEventListener("click", clearCopyStatus);
copyResultsButton.addEventListener("click", copyResults);

/* ---------- Page setup ---------- */

function initializePage() {
  if (currentYear) {
    currentYear.textContent =
      new Date().getFullYear().toString();
  }

  hideResults();
}

initializePage();
