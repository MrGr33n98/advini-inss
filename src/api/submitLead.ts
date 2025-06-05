import { DiagnosisFormData, MiniFormData } from '../lib/schema';
import { saveLead } from '../lib/db';

export const submitMiniForm = async (data: MiniFormData) => {
  try {
    // Save to database
    const leadId = saveLead({
      name: data.name,
      phone: data.phone
    });
    
    // In a real app, you might want to send an email notification or integrate with a CRM
    console.log(`Lead saved with ID: ${leadId}`);
    
    return {
      success: true,
      leadId
    };
  } catch (error) {
    console.error('Error submitting mini form:', error);
    return {
      success: false,
      error: 'Ocorreu um erro ao enviar seus dados. Por favor, tente novamente.'
    };
  }
};

export const submitDiagnosisForm = async (data: DiagnosisFormData) => {
  try {
    // Save to database
    const leadId = saveLead({
      name: data.name,
      phone: data.phone,
      cpf: data.cpf,
      benefitType: data.benefitType,
      problemType: data.problemType
    });
    
    // In a real app, you might want to send an email notification or integrate with a CRM
    console.log(`Lead saved with ID: ${leadId}`);
    
    return {
      success: true,
      leadId
    };
  } catch (error) {
    console.error('Error submitting diagnosis form:', error);
    return {
      success: false,
      error: 'Ocorreu um erro ao enviar seus dados. Por favor, tente novamente.'
    };
  }
};