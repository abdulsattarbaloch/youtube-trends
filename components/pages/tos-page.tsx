// app/terms-of-service/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText } from "lucide-react";
import Link from "next/link";
import NavbarSimple from "../navbar-simple";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarSimple />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
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
                <FileText className="w-6 h-6 text-blue-600" />
                Agreement to Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                By accessing and using YouTube Trending Tracker (&apos;the
                Service&apos;), you accept and agree to be bound by the terms
                and provision of this agreement. These Terms of Service
                (&apos;Terms&apos;) govern your use of our website and services.
              </p>
            </CardContent>
          </Card>

          {/* Use of Service */}
          <Card>
            <CardHeader>
              <CardTitle>Use of Service</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>Permitted Use</h4>
              <p>You may use our Service for:</p>
              <ul>
                <li>Viewing trending YouTube videos and analytics</li>
                <li>Research and educational purposes</li>
                <li>Personal and commercial content analysis</li>
                <li>Market research and trend analysis</li>
              </ul>

              <h4>Prohibited Use</h4>
              <p>You may not use our Service for:</p>
              <ul>
                <li>Any unlawful purpose or activity</li>
                <li>Attempting to gain unauthorized access to our systems</li>
                <li>Distributing malware or harmful code</li>
                <li>Violating any applicable laws or regulations</li>
                <li>Infringing on intellectual property rights</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data and Privacy */}
          <Card>
            <CardHeader>
              <CardTitle>Data and Privacy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                All video data displayed on our Service is obtained through
                YouTube&apos;s official Data API and is publicly available
                information. We do not store or retain any personal data from
                YouTube videos or user accounts.
              </p>
              <p>
                Our use of YouTube data is governed by YouTube&apos;s API Terms
                of Service and Google&apos;s Privacy Policy. We comply with all
                applicable data protection regulations.
              </p>
            </CardContent>
          </Card>

          {/* YouTube API Terms */}
          <Card>
            <CardHeader>
              <CardTitle>YouTube API Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                This Service uses the YouTube Data API to retrieve trending
                video information. By using our Service, you also agree to be
                bound by:
              </p>
              <ul>
                <li>YouTube&apos;s Terms of Service</li>
                <li>Google&apos;s Privacy Policy</li>
                <li>YouTube API Services Terms of Service</li>
              </ul>
              <p>
                You can revoke our app&apos;s access to your data via the Google
                security settings page at{" "}
                <Link
                  href="https://security.google.com/settings/security/permissions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://security.google.com/settings/security/permissions
                </Link>
              </p>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                The Service and its original content, features, and
                functionality are owned by YouTube Trending Tracker and are
                protected by international copyright, trademark, patent, trade
                secret, and other intellectual property laws.
              </p>
              <p>
                All video content, thumbnails, and metadata displayed belong to
                their respective creators and YouTube. We do not claim ownership
                of any third-party content.
              </p>
            </CardContent>
          </Card>

          {/* Disclaimers */}
          <Card>
            <CardHeader>
              <CardTitle>Disclaimers</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>Service Availability</h4>
              <p>
                We strive to provide continuous service availability, but we do
                not guarantee that the Service will be uninterrupted or
                error-free. The Service may be temporarily unavailable due to
                maintenance, updates, or technical issues.
              </p>

              <h4>Data Accuracy</h4>
              <p>
                While we make every effort to provide accurate and up-to-date
                information, we cannot guarantee the completeness or accuracy of
                the data provided through YouTube&apos;s API.
              </p>

              <h4>Third-Party Links</h4>
              <p>
                Our Service may contain links to third-party websites or
                services. We are not responsible for the content or practices of
                these third-party sites.
              </p>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                In no event shall YouTube Trending Tracker, its directors,
                employees, or agents be liable for any indirect, incidental,
                special, consequential, or punitive damages, including without
                limitation, loss of profits, data, use, goodwill, or other
                intangible losses, resulting from your use of the Service.
              </p>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card>
            <CardHeader>
              <CardTitle>Termination</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                We may terminate or suspend your access to our Service
                immediately, without prior notice or liability, for any reason
                whatsoever, including without limitation if you breach the
                Terms.
              </p>
              <p>
                Upon termination, your right to use the Service will cease
                immediately.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card>
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                We reserve the right, at our sole discretion, to modify or
                replace these Terms at any time. If a revision is material, we
                will try to provide at least 30 days notice prior to any new
                terms taking effect.
              </p>
              <p>
                What constitutes a material change will be determined at our
                sole discretion. By continuing to access or use our Service
                after those revisions become effective, you agree to be bound by
                the revised terms.
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
                If you have any questions about these Terms of Service, please
                contact us at:
              </p>
              <ul>
                <li>Email: legal@youtubetrending.com</li>
                <li>Website: Contact form on our website</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
