import { jsPDF } from 'jspdf';

export const generateCareerReportPDF = (predictionResult, userInput = {}) => {
  const doc = new jsPDF();
  const topCareer = predictionResult?.top_careers?.[0] || predictionResult?.[0] || {};
  const allCareers = predictionResult?.top_careers || predictionResult || [];
  
  const candidateName = userInput?.name || 'Valued Candidate';
  const timestamp = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // Header Colors & Styling
  doc.setFillColor(79, 70, 229); // Indigo 600
  doc.rect(0, 0, 210, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('AI CAREER RECOMMENDATION REPORT', 14, 22);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('IBM SkillsBuild Capstone Project | AI Career Guidance Engine', 14, 32);
  doc.text(`Generated: ${timestamp}`, 145, 32);

  // Candidate Details Section
  let yPos = 52;
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('1. Candidate Evaluation Profile', 14, yPos);
  
  yPos += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Name: ${candidateName}`, 14, yPos);
  doc.text(`Degree: ${userInput.degree || 'Computer Science'} (${userInput.education || "Bachelor's"})`, 110, yPos);

  yPos += 6;
  doc.text(`Experience: ${userInput.experience || 0} Years`, 14, yPos);
  doc.text(`CGPA: ${userInput.cgpa || 8.0} / 10.0`, 110, yPos);

  yPos += 6;
  doc.text(`Target Domain: ${userInput.domain || 'AI & Data'}`, 14, yPos);
  doc.text(`Work Preference: ${userInput.work_pref || 'Remote'}`, 110, yPos);

  // Top Recommendation Box
  yPos += 14;
  doc.setFillColor(243, 244, 246);
  doc.roundedRect(14, yPos, 182, 38, 3, 3, 'F');
  
  doc.setTextColor(79, 70, 229);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('PRIMARY AI MATCH', 20, yPos + 10);
  
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(18);
  doc.text(topCareer.career_name || 'AI / ML Engineer', 20, yPos + 22);
  
  doc.setTextColor(16, 185, 129); // Green match score
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(`Match Score: ${topCareer.match_score || 94.5}%`, 130, yPos + 22);

  doc.setTextColor(71, 85, 105);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Est. Salary: ${topCareer.salary_range || '$115k-$175k'}  |  Demand: ${topCareer.demand_level || 'Very High'}  |  Growth: ${topCareer.future_growth || '+32%'}`, 20, yPos + 31);

  // Top 5 Recommendations Table
  yPos += 48;
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('2. Top Recommended Career Paths', 14, yPos);

  yPos += 8;
  // Table Header
  doc.setFillColor(224, 231, 255);
  doc.rect(14, yPos, 182, 8, 'F');
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(67, 56, 202);
  doc.text('Rank & Career Title', 18, yPos + 6);
  doc.text('AI Match Score', 95, yPos + 6);
  doc.text('Salary Range', 140, yPos + 6);

  yPos += 8;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 41, 59);

  allCareers.slice(0, 5).forEach((career, idx) => {
    doc.text(`#${idx + 1}  ${career.career_name}`, 18, yPos + 6);
    doc.text(`${career.match_score}%`, 95, yPos + 6);
    doc.text(`${career.salary_range}`, 140, yPos + 6);
    doc.line(14, yPos + 9, 196, yPos + 9);
    yPos += 10;
  });

  // Learning Roadmap Section
  yPos += 8;
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('3. Personalized Skill Growth Roadmap', 14, yPos);

  yPos += 10;
  doc.setFontSize(9);

  const roadmap = topCareer.roadmap || [
    { phase: 'Phase 1', title: 'Foundations & Math', desc: 'Master core languages and statistics.' },
    { phase: 'Phase 2', title: 'Core Frameworks', desc: 'Build hands-on production projects.' },
    { phase: 'Phase 3', title: 'System Architecture', desc: 'Deploy cloud scale applications.' },
    { phase: 'Phase 4', title: 'Capstone & Portfolio', desc: 'Prepare for technical interviews.' }
  ];

  roadmap.forEach((step, i) => {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(79, 70, 229);
    doc.text(`• ${step.phase} - ${step.title}`, 18, yPos);
    yPos += 5;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(`   ${step.desc}`, 18, yPos);
    yPos += 7;
  });

  // Footer Disclaimer
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('Report powered by IBM SkillsBuild Capstone ML Recommendation System (XGBoost Classifier Engine).', 14, 285);

  doc.save(`Career_Guidance_Report_${candidateName.replace(/\s+/g, '_')}.pdf`);
};
