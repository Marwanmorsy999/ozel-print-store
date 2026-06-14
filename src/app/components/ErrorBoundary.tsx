import { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router';
import { Button } from './ui/button';
import { Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="mb-4" style={{ fontSize: '4rem', fontWeight: 700, lineHeight: 1 }}>Oops!</h1>
            <h2 className="uppercase tracking-[0.2em] mb-4 text-xl">حصل مشكلة</h2>
            <p className="text-muted-foreground mb-8">
              حصل خطأ غير متوقع. لو المشكلة كررت، تواصل معنا.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 uppercase tracking-wider">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  رجع للرئيسية
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => this.setState({ hasError: false, error: null })}
                className="uppercase tracking-wider"
              >
                حاول تاني
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
