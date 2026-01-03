-- Create assessment_sessions table to track user sessions and payment status
CREATE TABLE public.assessment_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  assessment_data JSONB,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'expired')),
  transaction_reference TEXT,
  paid_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster lookups
CREATE INDEX idx_assessment_sessions_email ON public.assessment_sessions(email);
CREATE INDEX idx_assessment_sessions_transaction_ref ON public.assessment_sessions(transaction_reference);

-- Enable Row Level Security
ALTER TABLE public.assessment_sessions ENABLE ROW LEVEL SECURITY;

-- Allow public insert (for creating sessions before payment)
CREATE POLICY "Anyone can create assessment sessions"
ON public.assessment_sessions
FOR INSERT
WITH CHECK (true);

-- Allow public select (sessions are identified by ID)
CREATE POLICY "Anyone can view their sessions"
ON public.assessment_sessions
FOR SELECT
USING (true);

-- Allow public update (for payment status updates via edge function)
CREATE POLICY "Anyone can update their sessions"
ON public.assessment_sessions
FOR UPDATE
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_assessment_sessions_updated_at
BEFORE UPDATE ON public.assessment_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();