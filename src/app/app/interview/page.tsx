"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { 
  MessageSquare, 
  Sparkles, 
  Send, 
  RotateCcw, 
  Lightbulb, 
  CheckCircle2, 
  AlertCircle,
  BrainCircuit,
  BarChart3
} from "lucide-react"
import { practiceInterviewWithAI, type PracticeInterviewOutput } from "@/ai/flows/practice-interview-with-ai-flow"
import { useToast } from "@/hooks/use-toast"

type InterviewStage = "config" | "practice" | "feedback"

export default function InterviewPrepPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [stage, setStage] = useState<InterviewStage>("config")
  
  // Config State
  const [role, setRole] = useState("Software Engineer")
  const [industry, setIndustry] = useState("Technology")
  const [type, setType] = useState<any>("Technical")
  const [difficulty, setDifficulty] = useState<any>("Intermediate")

  // Practice State
  const [question, setQuestion] = useState("")
  const [userAnswer, setUserAnswer] = useState("")
  const [results, setResults] = useState<PracticeInterviewOutput | null>(null)

  const handleGenerateQuestion = async () => {
    setLoading(true)
    try {
      const response = await practiceInterviewWithAI({
        action: "generateQuestion",
        targetRole: role,
        industry: industry,
        interviewType: type,
        difficulty: difficulty
      })
      setQuestion(response.generatedQuestion || "")
      setStage("practice")
      setResults(null)
      setUserAnswer("")
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Could not generate a question. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGetFeedback = async () => {
    if (!userAnswer.trim()) {
      toast({
        title: "Empty response",
        description: "Please provide an answer to receive feedback.",
        variant: "destructive"
      })
      return
    }
    setLoading(true)
    try {
      const response = await practiceInterviewWithAI({
        action: "getFeedback",
        targetRole: role,
        industry: industry,
        interviewType: type,
        difficulty: difficulty,
        question: question,
        userAnswer: userAnswer
      })
      setResults(response)
      setStage("feedback")
    } catch (error) {
      toast({
        title: "Feedback failed",
        description: "AI feedback service is currently unavailable.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGetModelAnswer = async () => {
    setLoading(true)
    try {
      const response = await practiceInterviewWithAI({
        action: "getModelAnswer",
        targetRole: role,
        industry: industry,
        interviewType: type,
        difficulty: difficulty,
        question: question
      })
      setResults(prev => prev ? ({ ...prev, modelAnswer: response.modelAnswer }) : response)
    } catch (error) {
      toast({
        title: "Model answer failed",
        description: "Could not retrieve model answer.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-border pb-10 gap-6">
        <div>
          <nav className="text-[10px] text-muted-foreground mb-3 uppercase tracking-[0.3em] font-black">Workspace / Intelligence</nav>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter">Interview Prep</h1>
        </div>
        <Button 
          onClick={() => {
            setStage("config")
            setResults(null)
            setQuestion("")
          }} 
          variant="outline" 
          className="h-12 px-8 border-border bg-card text-foreground font-black hover:border-primary uppercase tracking-widest text-xs"
        >
           Reset Session
        </Button>
      </header>

      <div className="grid lg:grid-cols-12 gap-10 md:gap-16">
        {/* Left Panel: Configuration */}
        <aside className="lg:col-span-4 space-y-8">
          <Card className="bg-card border-border overflow-hidden">
            <CardHeader className="p-8 pb-0">
              <CardTitle className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em]">Interview Settings</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-tight">Target Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="bg-background border-border h-12">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Software Engineer">Software Engineer</SelectItem>
                    <SelectItem value="Product Manager">Product Manager</SelectItem>
                    <SelectItem value="Data Scientist">Data Scientist</SelectItem>
                    <SelectItem value="UX Designer">UX Designer</SelectItem>
                    <SelectItem value="Marketing Manager">Marketing Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-tight">Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="bg-background border-border h-12">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="Behavioral">Behavioral (STAR)</SelectItem>
                    <SelectItem value="HR">General HR</SelectItem>
                    <SelectItem value="Case Study">Case Study</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-tight">Difficulty</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger className="bg-background border-border h-12">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Foundational">Foundational</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleGenerateQuestion} 
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14 font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/10 group"
              >
                {loading ? "Initializing..." : (
                  <span className="flex items-center gap-2">
                    Generate Question <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
                  </span>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border border-l-4 border-l-accent">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2 text-accent">
                <BrainCircuit size={18} />
                <h4 className="text-xs font-black uppercase tracking-widest">AI Tip</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                For Behavioral questions, try to follow the <strong>STAR</strong> method: Situation, Task, Action, and Result. This ensures clarity and impact.
              </p>
            </CardContent>
          </Card>
        </aside>

        {/* Right Panel: Active Practice */}
        <main className="lg:col-span-8 space-y-8">
          {stage === "config" && !loading && (
             <div className="h-[600px] flex flex-col items-center justify-center text-center p-16 border border-border border-dashed rounded-[32px] bg-card/30">
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-8">
                  <MessageSquare size={40} className="text-muted-foreground opacity-30" />
                </div>
                <h2 className="text-3xl font-black mb-4 tracking-tight">Ready to Level Up?</h2>
                <p className="text-muted-foreground max-w-sm leading-relaxed font-medium">Configure your target role and interview type on the left to start a high-performance practice session.</p>
             </div>
          )}

          {loading && (
            <div className="space-y-8 animate-pulse">
              <div className="h-40 bg-muted rounded-[32px]" />
              <div className="h-[400px] bg-muted rounded-[32px]" />
            </div>
          )}

          {stage !== "config" && !loading && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
              {/* Question Card */}
              <Card className="bg-card border-border overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <Sparkles size={100} className="text-primary" />
                </div>
                <CardContent className="p-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-primary/30 text-primary uppercase text-[10px] font-black px-3 py-1">
                      {type} Question
                    </Badge>
                    <Badge variant="outline" className="border-accent/30 text-accent uppercase text-[10px] font-black px-3 py-1">
                      {difficulty}
                    </Badge>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
                    "{question}"
                  </h3>
                </CardContent>
              </Card>

              {/* Input Area */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
                    Your Response <Badge variant="secondary" className="bg-muted text-muted-foreground text-[10px]">{userAnswer.length} chars</Badge>
                  </h3>
                  {stage === "feedback" && (
                    <Button variant="ghost" size="sm" onClick={() => setStage("practice")} className="text-xs font-black uppercase tracking-widest text-primary">
                      <RotateCcw size={14} className="mr-2" /> Edit Answer
                    </Button>
                  )}
                </div>
                
                <div className="relative">
                  <Textarea 
                    rows={10}
                    placeholder="Type your answer here... Be as detailed as possible."
                    className="bg-card border-border rounded-[32px] p-8 text-base focus:ring-primary/20 transition-all resize-none font-medium leading-relaxed"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    disabled={stage === "feedback"}
                  />
                  {stage === "practice" && (
                    <Button 
                      onClick={handleGetFeedback}
                      className="absolute bottom-6 right-6 h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest text-xs rounded-2xl shadow-lg"
                    >
                      Analyze & Score <Send size={16} className="ml-2" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Feedback Section */}
              {results && results.actionPerformed === "feedbackProvided" && (
                <div className="space-y-8 animate-in zoom-in-95 duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { label: "Clarity", val: results.clarityScore, color: "text-primary" },
                      { label: "Relevance", val: results.relevanceScore, color: "text-accent" },
                      { label: "Depth", val: results.depthScore, color: "text-destructive" }
                    ].map((s, i) => (
                      <Card key={i} className="bg-card border-border overflow-hidden">
                        <CardContent className="p-6 space-y-4">
                          <div className="flex justify-between items-end">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{s.label}</span>
                            <span className={`text-2xl font-black ${s.color}`}>{s.val}%</span>
                          </div>
                          <Progress value={s.val} className="h-1.5" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card className="bg-card border-border">
                    <CardHeader className="p-8 pb-4">
                      <CardTitle className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
                        <BarChart3 size={20} className="text-primary" /> AI Intelligence Report
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                      <div className="p-6 bg-muted/30 rounded-2xl border border-border">
                        <p className="text-sm text-foreground leading-relaxed font-medium">{results.feedback}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                        <Button onClick={handleGetModelAnswer} variant="outline" className="h-12 border-border text-muted-foreground font-black px-6 uppercase tracking-widest text-xs hover:border-accent hover:text-accent">
                           <Lightbulb size={16} className="mr-2" /> Show Model Answer
                        </Button>
                        <Button onClick={handleGenerateQuestion} className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-black px-8 uppercase tracking-widest text-xs ml-auto">
                           Next Question <ArrowRight size={16} className="ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Model Answer View */}
              {results?.modelAnswer && (
                <Card className="bg-primary/5 border border-primary/20 animate-in slide-in-from-top-4 duration-500">
                  <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-lg font-black uppercase tracking-tight flex items-center gap-2 text-primary">
                      <CheckCircle2 size={20} /> Professional Reference Answer
                    </CardTitle>
                    <CardDescription className="text-xs font-bold uppercase tracking-widest opacity-60">Curated by Interview Intelligence</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="prose prose-invert max-w-none">
                       <p className="text-sm text-foreground leading-relaxed font-medium whitespace-pre-wrap">{results.modelAnswer}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

function ArrowRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
