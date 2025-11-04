/**
 * Logger Utility
 * 
 * Provides structured logging with different log levels.
 * Works in both server and client components.
 * In production, logs are formatted for better observability.
 * In development, logs include more detailed information.
 */

type LogLevel = 'error' | 'warn' | 'info' | 'debug'

interface LogContext {
  [key: string]: unknown
}

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined'
const isDevelopment = process.env.NODE_ENV === 'development' || (!isBrowser && process.env.NODE_ENV !== 'production')
const isProduction = process.env.NODE_ENV === 'production'

/**
 * Structured error logger
 * 
 * @param message - Error message
 * @param error - Error object (optional)
 * @param context - Additional context data (optional)
 */
export function logError(
  message: string,
  error?: Error | unknown,
  context?: LogContext
): void {
  const logData: LogContext = {
    level: 'error',
    message,
    timestamp: new Date().toISOString(),
    ...context,
  }

  if (error instanceof Error) {
    logData.error = {
      name: error.name,
      message: error.message,
      stack: isDevelopment ? error.stack : undefined,
    }
  } else if (error) {
    logData.error = error
  }

  if (isProduction) {
    // In production, use structured logging (JSON format)
    console.error(JSON.stringify(logData))
  } else {
    // In development, use readable format
    console.error('❌ Error:', message)
    if (error instanceof Error) {
      console.error('Error details:', error.message)
      if (error.stack) {
        console.error('Stack trace:', error.stack)
      }
    }
    if (context && Object.keys(context).length > 0) {
      console.error('Context:', context)
    }
  }
}

/**
 * Warning logger
 * 
 * @param message - Warning message
 * @param context - Additional context data (optional)
 */
export function logWarn(message: string, context?: LogContext): void {
  const logData: LogContext = {
    level: 'warn',
    message,
    timestamp: new Date().toISOString(),
    ...context,
  }

  if (isProduction) {
    console.warn(JSON.stringify(logData))
  } else {
    console.warn('⚠️  Warning:', message)
    if (context && Object.keys(context).length > 0) {
      console.warn('Context:', context)
    }
  }
}

/**
 * Info logger
 * 
 * @param message - Info message
 * @param context - Additional context data (optional)
 */
export function logInfo(message: string, context?: LogContext): void {
  const logData: LogContext = {
    level: 'info',
    message,
    timestamp: new Date().toISOString(),
    ...context,
  }

  if (isProduction && !isDevelopment) {
    // In production, only log important info
    // Skip info logs in production unless explicitly needed
    return
  }

  console.log('ℹ️  Info:', message)
  if (context && Object.keys(context).length > 0) {
    console.log('Context:', context)
  }
}

/**
 * Debug logger (only in development)
 * 
 * @param message - Debug message
 * @param context - Additional context data (optional)
 */
export function logDebug(message: string, context?: LogContext): void {
  if (!isDevelopment) {
    return // Skip debug logs in production
  }

  console.debug('🔍 Debug:', message)
  if (context && Object.keys(context).length > 0) {
    console.debug('Context:', context)
  }
}

