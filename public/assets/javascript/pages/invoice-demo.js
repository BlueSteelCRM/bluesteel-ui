// Invoice Demo
// =============================================================

class InvoiceDemo {

  constructor () {
    this.worker = ''

    this.init()
  }

  init () {

    // event handlers
    this.generateInvoice()
    this.handleUpdate()
    this.handleDownload()
  }

  generateInvoice () {
    const worker = html2pdf()
    const element = document.getElementById('invoice')
    const $element = $(element)
    const $wrapper = $element.parent()
    const filename = $element.data('id')
    const $img = $('<img />')

    worker
      .from(element)
      .toImg()
      .then(() => {
        $element.css('display', 'none')

        $img
          .prop('alt', filename)
          .prop('src', worker.prop.img.src)
          .addClass('invoice-img')
          .css('max-width', `${$element.outerWidth()}px`)

        $wrapper.append($img)
      })

    this.worker = worker
  }

  savePdf () {
    const element = document.getElementById('invoice')
    const filename = $(element).data('id')

    this.worker
        .from(element)
        .toPdf()
        .save(filename)
  }

  /**
   * Please Add `<button id="update-invoice" class="btn btn-secondary">Update</button>`
   * into `page-invoice.html` to see a demo of how to add content dynamically.
   */
  handleUpdate () {
    const $invoice = $('#invoice')

    $('#update-invoice').on('click', e => {
      const $invoiceImg = $('.invoice-img')
      // simute for changes
      // update invoice content
      $invoice
        .css('display', '')
        .find('.invoice-body')
        .append('<hr />')
      // remove existing invoice
      $invoiceImg.remove()
      // generate new invoice
      this.generateInvoice()
    })
  }

  handleDownload () {
    $('#download-pdf').on('click', e => {
      e.preventDefault()

      this.savePdf()
    })
  }
}


/**
 * Keep in mind that your scripts may not always be executed after the theme is completely ready,
 * you might need to observe the `theme:load` event to make sure your scripts are executed after the theme is ready.
 */
$(document).on('theme:init', () => {
  new InvoiceDemo()
})
