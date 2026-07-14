import { formatCurrency } from '@/utils/format';

export default function ShippingInfoPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
          <h1 className="text-3xl font-bold text-white mb-8">Shipping Information</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-6">
              <strong>Last updated:</strong> December 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Shipping Options</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-3">Standard Shipping</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• 3-5 business days</li>
                    <li>• Free on orders over {formatCurrency(999)}</li>
                    <li>• {formatCurrency(99)} for orders under {formatCurrency(999)}</li>
                    <li>• Tracking included</li>
                  </ul>
                </div>
                <div className="bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-3">Express Shipping</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• 1-2 business days</li>
                    <li>• {formatCurrency(199)} flat rate</li>
                    <li>• Priority processing</li>
                    <li>• Real-time tracking</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Processing Times</h2>
              <p className="text-gray-300 mb-4">
                All orders are processed within 1-2 business days. Processing times may be longer during 
                peak seasons or holidays. You will receive an email confirmation once your order has been 
                processed and shipped.
              </p>
              <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-blue-300">
                  <strong>Note:</strong> Processing times may be extended for custom or personalized items. 
                  We'll notify you if your order requires additional processing time.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Shipping Destinations</h2>
              <p className="text-gray-300 mb-4">
                We currently ship to the following locations:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>All states and union territories in India</li>
                <li>Remote areas and islands (additional charges may apply)</li>
                <li>International shipping available for select products</li>
              </ul>
              <p className="text-gray-300 mb-4">
                For international orders, please contact our customer service team for shipping rates 
                and delivery estimates.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Order Tracking</h2>
              <p className="text-gray-300 mb-4">
                Once your order ships, you'll receive a tracking number via email. You can track your 
                package using:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Our order tracking page on the website</li>
                <li>The tracking link provided in your shipping confirmation email</li>
                <li>Direct tracking on the courier's website</li>
                <li>Our mobile app (coming soon)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Delivery Issues</h2>
              <p className="text-gray-300 mb-4">
                If you experience any delivery issues:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Contact our customer service team immediately</li>
                <li>Provide your order number and tracking information</li>
                <li>We'll work with the courier to resolve the issue</li>
                <li>If the package is lost or damaged, we'll send a replacement</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Special Handling</h2>
              <p className="text-gray-300 mb-4">
                Some items require special handling:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Fragile items are carefully packaged with extra protection</li>
                <li>Electronics are shipped in original manufacturer packaging</li>
                <li>Perishable items are shipped with temperature control</li>
                <li>High-value items require signature confirmation</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Holiday Shipping</h2>
              <p className="text-gray-300 mb-4">
                During major holidays and peak shopping seasons:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Processing times may be extended by 1-2 days</li>
                <li>Express shipping may not be available for all locations</li>
                <li>We'll post updated shipping schedules on our website</li>
                <li>Order early to ensure delivery before holidays</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">AI-Powered Logistics</h2>
              <p className="text-gray-300 mb-4">
                FAVCOM uses advanced AI technology to optimize shipping:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Dynamic routing for faster delivery</li>
                <li>Predictive analytics for inventory placement</li>
                <li>Real-time delivery optimization</li>
                <li>Smart packaging recommendations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Contact Shipping Support</h2>
              <p className="text-gray-300 mb-4">
                For shipping-related questions or concerns:
              </p>
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-300">
                  <strong>Email:</strong> shipping@favcom.com<br />
                  <strong>Phone:</strong> +1 (555) 123-4567<br />
                  <strong>Live Chat:</strong> Available 24/7 on our website<br />
                  <strong>Hours:</strong> Monday-Friday 9 AM - 6 PM IST
                </p>
              </div>
            </section>

            <div className="border-t border-gray-700 pt-6">
              <p className="text-sm text-gray-400">
                Shipping policies are subject to change. Please check this page regularly for updates. 
                For the most current shipping information, contact our customer service team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
