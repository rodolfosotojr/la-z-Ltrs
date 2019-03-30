// jQuery Login code
$(document).ready(function () {

  function savedOrders() {
    // show past orders
    $.ajax({ url: "/api/savedorders", method: "GET" })
      .then(function (savedorder) {
        console.log("***************SAVED ORDER HISTORY:\n", savedorder);
        savedorder.forEach(function (item) {
          url = "https://api.handwrytten.com/v1/cards/view?card_id=" + item.card_id + "&lowres=1"
          $.ajax({ url: url, method: "GET" }).then(function (handwrytten) {
            row = `
            <tr>
              <td>${item.id}</td>
              <td>${item.sender_name}</td>
              <td>${item.recipient_name}</td>
              <td>${item.card_type}</td>
              <td><img src="${handwrytten.card.cover}" style="width: 75px; height:75px; object-fit: cover"></td>
              <td style="font-family: ${item.font}; font-size: 2em;">${item.font_label}</td>
              <td>${item.createdAt}</td>
            </tr>
            `
            $("#save-history").append($(row));

          })
        })
      })
  }

  savedOrders();

  function getOrders() {
    // show past orders
    $.ajax({ url: "/api/orderhistory", method: "GET" })
      .then(function (order) {
        console.log("***************ORDER HISTORY:\n", order.orders);
        order.orders.forEach(function (item) {
          row = `
          <tr>
            <td>${item.id}</td>
            <td>${item.address_from.name}</td>
            <td>${item.address_to.name}</td>
            <td>${item.card.name}</td>
            <td><img src="${item.card.cover}" style="width: 75px; height:75px; object-fit: cover"></td>
            <td style="font-family: ${item.font}; font-size: 2em;">${item.fontInfo.label}</td>
            <td>${item.date_created}</td>
          </tr>
          `
          $("#order-history").append($(row));
        })
      })
  }

  getOrders();

});
