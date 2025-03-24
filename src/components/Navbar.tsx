
import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher, { Language } from "./LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { User, BookOpen, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface NavbarProps {
  onLanguageChange: (lang: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLanguageChange }) => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="border-b py-4">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold geox-gradient-text">GeoX</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/analyze">
            <Button variant="ghost">Analyze</Button>
          </Link>
          <Link to="/admin">
            <Button variant="ghost">Admin</Button>
          </Link>
          <Link to="/knowledge-hub">
            <Button variant="ghost" className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              Knowledge Hub
            </Button>
          </Link>
          <div className="border-l pl-4 flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center mr-3 gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <User className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{user?.name || user?.email.split('@')[0]}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={logout}
                  className="h-8 w-8"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 mr-3">
                <Link to="/sign-in">
                  <Button variant="outline" size="sm">Sign In</Button>
                </Link>
                <Link to="/sign-up">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
            <LanguageSwitcher onLanguageChange={onLanguageChange} />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
