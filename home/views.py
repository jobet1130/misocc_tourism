from django.http import JsonResponse
from django.template.loader import render_to_string
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.shortcuts import render
from wagtail.models import Page

@require_POST
def navigate(request):
    """
    Handle AJAX navigation requests
    """
    page_name = request.POST.get('page', 'home')
    
    try:
        # Render the appropriate template based on the page name
        if page_name == 'home':
            template_name = 'home/home_page.html'
        else:
            template_name = f'home/{page_name}.html'
        
        # Check if the template exists
        try:
            content = render_to_string(template_name, request=request)
            return JsonResponse({
                'success': True,
                'content': content,
                'page': page_name
            })
        except:
            # If specific page template doesn't exist, return a generic response
            return JsonResponse({
                'success': True,
                'content': f'<div class="container mx-auto px-4 py-8"><h1 class="text-4xl font-bold text-[#007F5F] mb-6 text-center">{page_name.title()} Page</h1><p class="text-gray-700 mb-6 text-center max-w-3xl mx-auto">This is the {page_name} page content.</p></div>',
                'page': page_name
            })
            
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        })