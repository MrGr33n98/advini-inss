import { DiagnosisFormData, MiniFormData } from '../lib/schema';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zeoedkujoirzpigpzylb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inplb2Vka3Vqb2lyenBpZ3B6eWxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMzk2MDUsImV4cCI6MjA2NDcxNTYwNX0.w49UqkTGGUsHXPtGQaH9rCTUnJMJ491GMN607FUp5i0';
export const supabase = createClient(supabaseUrl, supabaseKey);

export const submitMiniForm = async (data: MiniFormData) => {
  try {
    const { data: lead, error } = await supabase
      .from('leads')
      .insert([{ name: data.name, phone: data.phone }])
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      leadId: lead.id
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
    const { data: lead, error } = await supabase
      .from('leads')
      .insert([{
        name: data.name,
        phone: data.phone,
        cpf: data.cpf,
        benefitType: data.benefitType,
        problemType: data.problemType
      }])
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      leadId: lead.id
    };
  } catch (error) {
    console.error('Error submitting diagnosis form:', error);
    return {
      success: false,
      error: 'Ocorreu um erro ao enviar seus dados. Por favor, tente novamente.'
    };
  }
};