package fr.omatech.ordernow.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.omatech.ordernow.web.rest.TestUtil;

public class MenuCategoryTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MenuCategory.class);
        MenuCategory menuCategory1 = new MenuCategory();
        menuCategory1.setId(1L);
        MenuCategory menuCategory2 = new MenuCategory();
        menuCategory2.setId(menuCategory1.getId());
        assertThat(menuCategory1).isEqualTo(menuCategory2);
        menuCategory2.setId(2L);
        assertThat(menuCategory1).isNotEqualTo(menuCategory2);
        menuCategory1.setId(null);
        assertThat(menuCategory1).isNotEqualTo(menuCategory2);
    }
}
