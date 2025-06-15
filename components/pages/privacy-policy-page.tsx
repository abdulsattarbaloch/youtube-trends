// app/privacy-policy/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Cookie, Database, Eye, Shield } from "lucide-react";
import NavbarSimple from "../navbar-simple";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarSimple />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        <div className="space-y-6">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-green-600" />
                Our Commitment to Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                YouTube Trending Tracker (&apos;we&apos;, &apos;our&apos;, or
                &apos;us&apos;) is committed to protecting your privacy. This
                Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website and use
                our services.
              </p>
              <p>
                We respect your privacy and are committed to protecting your
                personal data. This policy will help you understand what
                information we collect, how we use it, and what choices you
                have.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-6 h-6 text-blue-600" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>Information We DO NOT Collect</h4>
              <p>We want to be clear about what we don&apos;t collect:</p>
              <ul>
                <li>We do not require user registration or accounts</li>
                <li>We do not collect personal identification information</li>
                <li>We do not store user preferences or settings</li>
                <li>We do not access your YouTube account or personal data</li>
                <li>
                  We do not collect email addresses or contact information
                </li>
              </ul>

              <h4>Technical Information We May Collect</h4>
              <p>
                Like most websites, we may automatically collect certain
                technical information:
              </p>
              <ul>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>IP address (anonymized)</li>
                <li>Pages visited and time spent on site</li>
                <li>Referring website</li>
                <li>Device type (desktop, mobile, tablet)</li>
              </ul>
              <p>
                This information is collected through standard web server logs
                and is used solely for improving our service and understanding
                usage patterns.
              </p>
            </CardContent>
          </Card>

          {/* YouTube Data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-6 h-6 text-red-600" />
                YouTube Data Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>Public YouTube Data</h4>
              <p>
                Our service displays publicly available YouTube video
                information obtained through YouTube&apos;s Data API, including:
              </p>
              <ul>
                <li>Video titles and descriptions</li>
                <li>Channel names</li>
                <li>View counts, like counts, and comment counts</li>
                <li>Publication dates</li>
                <li>Video thumbnails</li>
                <li>Video categories</li>
              </ul>

              <h4>Data Retention</h4>
              <p>
                We do not store or retain any YouTube data on our servers. All
                video information is fetched in real-time from YouTube&apos;s
                API and displayed directly to users without storage.
              </p>

              <h4>YouTube&apos;s Privacy Policy</h4>
              <p>
                Since we use YouTube&apos;s Data API, your use of our service is
                also governed by{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Google&apos;s Privacy Policy
                </a>
                .
              </p>
            </CardContent>
          </Card>

          {/* Cookies and Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="w-6 h-6 text-orange-600" />
                Cookies and Tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>Cookies</h4>
              <p>We use minimal cookies and similar tracking technologies:</p>
              <ul>
                <li>
                  <strong>Essential Cookies:</strong> Required for basic website
                  functionality
                </li>
                <li>
                  <strong>Preference Cookies:</strong> Remember your region and
                  filter settings (stored locally in your browser)
                </li>
              </ul>

              <h4>Third-Party Analytics</h4>
              <p>
                We may use third-party analytics services (such as Google
                Analytics) to help us understand how our website is used. These
                services may collect information about your use of our site and
                other websites.
              </p>

              <h4>Managing Cookies</h4>
              <p>
                You can control cookies through your browser settings. However,
                disabling cookies may affect the functionality of our website.
              </p>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card>
            <CardHeader>
              <CardTitle>How We Use Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>The limited information we collect is used solely for:</p>
              <ul>
                <li>Providing and maintaining our service</li>
                <li>Improving website performance and user experience</li>
                <li>Understanding usage patterns and popular features</li>
                <li>Ensuring website security and preventing abuse</li>
                <li>Complying with legal obligations</li>
              </ul>
              <p>
                We do not sell, trade, or otherwise transfer your information to
                third parties for marketing purposes.
              </p>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card>
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                We implement appropriate security measures to protect against
                unauthorized access, alteration, disclosure, or destruction of
                information. These measures include:
              </p>
              <ul>
                <li>HTTPS encryption for all data transmission</li>
                <li>Regular security assessments</li>
                <li>Secure hosting infrastructure</li>
                <li>Limited access to any collected data</li>
              </ul>
              <p>
                However, no method of transmission over the Internet or
                electronic storage is 100% secure, and we cannot guarantee
                absolute security.
              </p>
            </CardContent>
          </Card>

          {/* Third-Party Services */}
          <Card>
            <CardHeader>
              <CardTitle>Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>YouTube Data API</h4>
              <p>
                Our service relies on YouTube&apos;s Data API. Your use of our
                service is subject to:
              </p>
              <ul>
                <li>YouTube&apos;s Terms of Service</li>
                <li>Google&apos;s Privacy Policy</li>
                <li>YouTube API Services Terms of Service</li>
              </ul>

              <h4>External Links</h4>
              <p>
                Our website contains links to YouTube videos and other external
                sites. We are not responsible for the privacy practices of these
                external sites.
              </p>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle>Your Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Since we collect minimal personal information, your rights
                include:
              </p>
              <ul>
                <li>
                  <strong>Access:</strong> You can request information about any
                  data we may have collected
                </li>
                <li>
                  <strong>Deletion:</strong> You can request deletion of any
                  data we may have collected
                </li>
                <li>
                  <strong>Correction:</strong> You can request correction of any
                  inaccurate data
                </li>
                <li>
                  <strong>Opt-out:</strong> You can opt-out of analytics
                  tracking through browser settings
                </li>
              </ul>
              <p>
                To exercise any of these rights, please contact us using the
                information provided below.
              </p>
            </CardContent>
          </Card>

          {/* Children's Privacy */}
          <Card>
            <CardHeader>
              <CardTitle>Children&apos;s Privacy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Our service is not directed to children under the age of 13. We
                do not knowingly collect personally identifiable information
                from children under 13. If you are a parent or guardian and
                believe your child has provided us with personal information,
                please contact us.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Privacy Policy */}
          <Card>
            <CardHeader>
              <CardTitle>Changes to This Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the &apos;Last updated&apos; date.
              </p>
              <p>
                You are advised to review this Privacy Policy periodically for
                any changes. Changes to this Privacy Policy are effective when
                they are posted on this page.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                If you have any questions about this Privacy Policy or our data
                practices, please contact us:
              </p>
              <ul>
                <li>Email: thumbnaildownloader321@gmail.com</li>
              </ul>
              <p>
                We will respond to your inquiry within a reasonable timeframe.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
