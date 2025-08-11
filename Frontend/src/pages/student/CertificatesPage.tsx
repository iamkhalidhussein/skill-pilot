import React from 'react';
import { Download, Award, Calendar, Trophy } from 'lucide-react';
import { useGetCertificatesQuery } from '../../store/api/testApi';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export const CertificatesPage: React.FC = () => {
  const { data: certificatesResponse, isLoading } = useGetCertificatesQuery();
  const certificates = certificatesResponse?.data || [];

  const handleDownload = (certificateId: string): void => {
    // Mock download functionality
    const link = document.createElement('a');
    link.href = `data:text/plain;charset=utf-8,Certificate ID: ${certificateId}`;
    link.download = `certificate-${certificateId}.txt`;
    link.click();
  };

  const getLevelColor = (level: string): string => {
    const colors: Record<string, string> = {
      'A1': 'bg-green-100 text-green-800',
      'A2': 'bg-blue-100 text-blue-800',
      'B1': 'bg-purple-100 text-purple-800',
      'B2': 'bg-indigo-100 text-indigo-800',
      'C1': 'bg-yellow-100 text-yellow-800',
      'C2': 'bg-red-100 text-red-800',
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading certificates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Certificates</h1>
          <p className="mt-2 text-gray-600">
            View and download your digital competency certificates
          </p>
        </div>

        {certificates.length === 0 ? (
          <Card className="text-center py-12">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full">
              <Award className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Certificates Yet</h3>
            <p className="text-gray-600 mb-6">
              Complete assessments to earn your digital competency certificates
            </p>
            <Button onClick={() => window.location.href = '/test'}>
              Take Assessment
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate: any) => (
              <Card key={certificate._id} className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-500 to-transparent opacity-10"></div>
                
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                      <Trophy className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Digital Competency
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor(certificate.level)}`}>
                        Level {certificate.level}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Certificate ID:</span>
                    <span className="font-mono text-gray-900">{certificate.certificateId}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Score:</span>
                    <span className="font-semibold text-gray-900">{Math.round(certificate.score)}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Issue Date:
                    </span>
                    <span className="text-gray-900">
                      {new Date(certificate.issueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(certificate.certificateId)}
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Certificate
                  </Button>
                </div>

                <div className="mt-3 text-center">
                  <p className="text-xs text-gray-500">
                    Valid digital competency certification
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}

        {certificates.length > 0 && (
          <Card className="mt-8 bg-blue-50 border-blue-200">
            <div className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                <Award className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 mb-2">Certificate Information</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Certificates are digitally signed and verifiable</li>
                  <li>• Each certificate has a unique ID for verification</li>
                  <li>• Certificates can be shared with employers and institutions</li>
                  <li>• Digital competency levels are based on international standards</li>
                </ul>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};