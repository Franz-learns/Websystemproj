// ag-jquery.js - small helpers demonstrating jQuery usage
$(function(){
  console.log('jQuery loaded and running from ag-jquery.js');

  // Initialize jQuery UI datepicker if available
  if($.ui && $.fn.datepicker === undefined){
    // If using jQuery UI datepicker
    try{
      $('#bookingDate').datepicker({ dateFormat: 'mm/dd/yy', minDate: 0 });
    }catch(e){
      // fallback: leave input as text
      console.warn('jQuery UI datepicker init failed:', e);
    }
  } else {
    // if no jQuery UI, fall back to HTML5 date picker behavior
    $('#bookingDate').attr('type','date');
  }

  // Booking form handler
  $('#bookingForm').on('submit', function(e){
    e.preventDefault();
    const name = $('#bookingName').val().trim() || 'Guest';
    const date = $('#bookingDate').val().trim() || 'Not specified';
    alert('Thank you, ' + name + '. Your consultation is requested for: ' + date + ' (UI only)');
    $('#bookingForm')[0].reset();
  });

  // Wire add-to-cart buttons to open modal with product name and quantity using jQuery
  $('.add-to-cart').on('click', function(e){
    e.preventDefault();
    const $btn = $(this);
    const $card = $btn.closest('.card');
    const productName = $card.find('.card-title').text().trim() || 'Product';
    const quantity = $card.find('.quantity-input').val() || 1;
    $('#productName').text(productName + (quantity > 1 ? ' (x'+quantity+')' : ''));
    const modalEl = document.getElementById('addToCartModal');
    const modal = new bootstrap.Modal(modalEl);
    modal.show();

    // temporary button style change
    const original = $btn.html();
    $btn.removeClass('btn-outline-light').addClass('btn-success').html('✓ Added');
    setTimeout(()=>{ $btn.removeClass('btn-success').addClass('btn-outline-light').html(original); }, 2500);
  });

  // Cart badge helpers
  function getCartCount(){
    const el = $('#cartCount');
    if(!el.length) return 0;
    const txt = el.text().trim();
    const n = parseInt(txt,10);
    return isNaN(n) ? 0 : n;
  }
  function setCartCount(n){
    const el = $('#cartCount');
    if(!el.length) return;
    if(n <= 0){ el.addClass('visually-hidden'); el.addClass('hidden'); el.text('0'); }
    else { el.removeClass('visually-hidden'); el.removeClass('hidden'); el.text(n); }
  }

  // Increment badge when add-to-cart clicked
  $('.add-to-cart').on('click', function(){
    const qtyInput = $(this).closest('.card').find('.quantity-input');
    let qty = 1;
    if(qtyInput && qtyInput.length){ qty = parseInt(qtyInput.val(),10) || 1; }
    const current = getCartCount();
    setCartCount(current + qty);
  });

});
