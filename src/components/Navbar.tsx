
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MessageSquare, Bell, Menu } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and site name */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                SS
              </div>
              <span className="text-lg font-bold text-primary hidden md:block">SkillSwap</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/skills" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Browse Skills
            </Link>
            <Link to="/requests" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Requests
            </Link>
            <Link to="/messages" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Messages
            </Link>
          </div>

          {/* Right side - Search and User */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search skills..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-56"
              />
            </div>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="relative">
                  <MessageSquare className="h-5 w-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    3
                  </span>
                </Button>
                
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    2
                  </span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" asChild>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Sign up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 pb-3 pt-2">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/skills"
              className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Browse Skills
            </Link>
            <Link
              to="/requests"
              className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Requests
            </Link>
            <Link
              to="/messages"
              className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Messages
            </Link>
          </div>
          
          <div className="px-4 py-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search skills..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          
          {isAuthenticated ? (
            <div className="px-4 pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user?.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/settings"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-100"
                >
                  Log out
                </button>
              </div>
            </div>
          ) : (
            <div className="px-4 py-3 border-t border-gray-200 flex flex-col space-y-2">
              <Button variant="outline" asChild className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                <Link to="/register">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
