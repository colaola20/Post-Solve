import { createClient } from '@supabase/supabase-js'

const URL = 'https://dipbqyefkqqmzcymlcht.supabase.co'

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpcGJxeWVma3FxbXpjeW1sY2h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMTI5OTcsImV4cCI6MjA2ODg4ODk5N30.OQXqpOnvfMCxTTcce33AmJniz1hOl7FJZSmkS9J3-sU'

export const supabase = createClient(URL, API_KEY)